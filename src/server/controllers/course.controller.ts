import { NextRequest } from "next/server";
import { IEmailBody, ICourseInput, IPurchasedCourse, UserRole } from "../interfaces";
import { validateUser } from "../middlewares/validateTokenHandler";
import mongoose, { Types } from "mongoose";
import { Resend } from "resend";
import Chapter from "../models/chapterColl.model";
import Video from "../models/videosColl.model";
import DBConnection from "../dbConfig/dbConfig";
import { Course } from "../models/course.model";
import PurchasedCourse from "../models/purchasedColl.model";

DBConnection()
const courseNotFound = "Course not found"

//private endpoints

export async function createCourse(req: NextRequest, courseData: ICourseInput) {
    const fieldsRequire = 'All fields are mandatory'
    const tokenExpired = 'JWT expired'

    try {
        const {
            title,
            level,
            description,
            totalVideosTiming,
            images,
            chapters,
        } = courseData;

        if (
            !title ||
            !description ||
            !level ||
            !totalVideosTiming ||
            !images?.length ||
            !chapters?.length
        ) {
            return { error: fieldsRequire, status: 400 };
        }
        const user = validateUser(req);
        if (!user?.id) {
            return { error: tokenExpired, status: 498 };
        }
        const course = await Course.create({
            user_id: user.id,
            title,
            description,
            level,
            totalVideosTiming,
            images,
            chapters: [],
        });

        for (const _chapter of chapters) {
            const chapter = await Chapter.create({
                course_id: course._id,
                title: _chapter.title,
                videos: [],
            });
            for (const _video of _chapter.videos) {
                const video = await Video.create({
                    chapter_id: chapter._id,
                    videoTitle: _video.videoTitle,
                    description: _video.description,
                    videoUri: _video.videoUri,
                    videoTiming: _video.videoTiming,
                });
                chapter.videos.push(video._id);
            }
            await chapter.save();
            course.chapters.push(chapter._id);
        }
        await course.save();
        return { course, status: 201 };
    } catch (error) {
        return { error: (error as Error).message, status: 500 };
    }
}

export async function deleteCourse(req: NextRequest, id: string) {
    const deletedCollections = "Course and all related chapters and videos deleted"
    const invalidUser = "Invalid user";
    const userIdNotMatch = "The user ID does not match."
    const notAuthorized = "You're not authorized to delete this course."

    try {
        const user = validateUser(req);
        if (!user?.id) {
            return { error: invalidUser, status: 401 };
        }
        const course = await Course.findById(id);
        if (!course) {
            return { message: courseNotFound, status: 404 };
        }
        if (String(course.user_id) !== user.id) {
            return { error: userIdNotMatch, status: 403 };
        }
        if (user.role !== UserRole.admin) {
            return { error: notAuthorized, status: 403 };
        }

        const chapters = await Chapter.find({ course_id: id });
        const chapterIds = chapters.map(ch => ch._id);
        await Video.deleteMany({ chapter_id: { $in: chapterIds } });
        await Chapter.deleteMany({ course_id: id });
        await Course.findByIdAndDelete(id);
        return { error: deletedCollections, status: 200 };
    } catch (error) {
        return { error: (error as Error).message, status: 500 };
    }
}

export async function getUserCourseById(req: NextRequest, id: string) {
    const unauthorizedAccess = "Unauthorized access"
    try {
        const user = await validateUser(req);
        const course = await Course.findById(id);

        if (!course) {
            return { error: courseNotFound, status: 404 };
        }

        if (user.id !== course.user_id.toString()) {
            return { error: unauthorizedAccess, status: 403 };
        }

        const matchFilter = {
            _id: new mongoose.Types.ObjectId(id),
            user_id: new mongoose.Types.ObjectId(user.id),
        };
        const coursesWithChaptersAndVideos = await Course.aggregate([
            { $match: matchFilter },
            {
                $lookup: {
                    from: 'chapters',
                    localField: 'chapters',
                    foreignField: '_id',
                    as: 'chapters'
                }
            },
            {
                $unwind: {
                    path: '$chapters',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'videos',
                    localField: 'chapters.videos',
                    foreignField: '_id',
                    as: 'chapters.videos'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    user_id: { $first: '$user_id' },
                    title: { $first: '$title' },
                    level: { $first: '$level' },
                    description: { $first: '$description' },
                    totalVideosTiming: { $first: '$totalVideosTiming' },
                    images: { $first: '$images' },
                    chapters: { $push: '$chapters' }
                }
            },
        ]);
        return { course: coursesWithChaptersAndVideos[0] || null, status: 200 };
    } catch (error) {
        return ({ error: (error as Error).message, status: 500 })
    }
}

export async function getCoursesByAdmin(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const _title = searchParams.get('title') || '';
        const sortOrder = searchParams.get('sortOrder') || 'asc';
        const level = searchParams.get('level') || '';
        const user = validateUser(req);
        const matchFilter: any = { user_id: new mongoose.Types.ObjectId(user.id) };

        if (_title) {
            matchFilter.title = { $regex: _title, $options: 'i' };
        }
        if (level) {
            matchFilter.level = level;
        }

        const sortDirection = sortOrder === 'desc' ? -1 : 1;
        const coursesWithChaptersAndVideos = await Course.aggregate([
            { $match: matchFilter },
            {
                $lookup: {
                    from: 'chapters',
                    localField: 'chapters',
                    foreignField: '_id',
                    as: 'chapters'
                }
            },
            {
                $unwind: {
                    path: '$chapters',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'videos',
                    localField: 'chapters.videos',
                    foreignField: '_id',
                    as: 'chapters.videos'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'username'
                }
            },
            {
                $unwind: {
                    path: '$username',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: '$_id',
                    user_id: { $first: '$user_id' },
                    user_name: { $first: "$username.name" },
                    title: { $first: '$title' },
                    level: { $first: '$level' },
                    description: { $first: '$description' },
                    totalVideosTiming: { $first: '$totalVideosTiming' },
                    images: { $first: '$images' },
                    chapters: { $push: '$chapters' }
                }
            },
            {
                "$addFields": {
                    "lowercasedField": { "$toLower": "$title" }
                }
            },
            { $sort: { "lowercasedField": sortDirection } }
        ]);
        return { courses: coursesWithChaptersAndVideos, status: 200 };
    } catch (error) {
        return { err: (error as Error).message, status: 500 };
    }
}

export async function updateCourse(req: NextRequest, courseId: string, courseData: ICourseInput) {

    const fieldsRequire = "All fields are mandatory";
    const tokenExpired = "JWT expired"

    try {
        const {
            title,
            level,
            description,
            totalVideosTiming,
            images,
            chapters,
        } = courseData;
        if (
            !title ||
            !description ||
            !level ||
            !totalVideosTiming ||
            !images?.length ||
            !chapters?.length
        ) {
            return { error: fieldsRequire, status: 400 };
        }
        const user = validateUser(req);
        if (!user?.id) {
            return { error: tokenExpired, status: 498 };
        }
        const course = await Course.findById(courseId);
        if (!course) return { error: courseNotFound, status: 404 };
        course.title = title;
        course.level = level;
        course.description = description;
        course.totalVideosTiming = totalVideosTiming;
        course.images = images;
        course.updatedAt = Date.now();
        const updatedChapterIds: Types.ObjectId[] = [];
        const existingChapters = await Chapter.find({ course_id: course._id });
        const existingChapterIds = existingChapters.map(c => c._id.toString());

        for (const _chapter of chapters) {
            let chapter;
            if (_chapter._id) {
                chapter = await Chapter.findByIdAndUpdate(
                    _chapter._id,
                    { title: _chapter.title },
                    { new: true }
                );
                if (!chapter) continue;
            } else {
                chapter = await Chapter.create({
                    course_id: course._id,
                    title: _chapter.title,
                    videos: [],
                });
            }

            const updatedVideoIds: Types.ObjectId[] = [];
            const existingVideos = await Video.find({ chapter_id: chapter._id });
            const existingVideoIds = existingVideos.map(v => v._id.toString());
            for (const _video of _chapter.videos) {
                let video;
                if (_video._id) {
                    video = await Video.findByIdAndUpdate(
                        _video._id,
                        {
                            videoTitle: _video.videoTitle,
                            description: _video.description,
                            videoUri: _video.videoUri,
                            videoTiming: _video.videoTiming,
                        },
                        { new: true }
                    );
                    if (!video) continue;
                } else {
                    video = await Video.create({
                        chapter_id: chapter._id,
                        videoTitle: _video.videoTitle,
                        description: _video.description,
                        videoUri: _video.videoUri,
                        videoTiming: _video.videoTiming,
                    });
                }
                updatedVideoIds.push(video._id);
            }
            const videosToDelete = existingVideoIds.filter(
                id => !updatedVideoIds.map(vid => vid.toString()).includes(id)
            );
            if (videosToDelete.length) {
                await Video.deleteMany({ _id: { $in: videosToDelete } });
            }
            chapter.videos = updatedVideoIds;
            await chapter.save();
            updatedChapterIds.push(chapter._id);
        }
        const chaptersToDelete = existingChapterIds.filter(
            id => !updatedChapterIds.map(cid => cid.toString()).includes(id)
        );
        if (chaptersToDelete.length) {
            await Video.deleteMany({ chapter_id: { $in: chaptersToDelete } });
            await Chapter.deleteMany({ _id: { $in: chaptersToDelete } });
        }
        course.chapters = updatedChapterIds;
        await course.save();
        return { course, status: 200 };
    } catch (error) {
        return {
            error: (error as Error).message,
            status: 500,
        };
    }
}

//public endpoints 

export async function contact(req: NextRequest, emailBody: IEmailBody) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'bidem53458@nomrista.com',
            subject: emailBody.subject,
            html: `<p>Congrats on sending your <strong>
            <br>
            first name ${emailBody.firstname} <br>
            last name ${emailBody.lastname} <br>
            mobileno: ${emailBody.phonenumber} <br>
            message: ${emailBody.message} <br>
            message: ${emailBody.email} <br>
            </strong></p>`
        });
        if (error) {
            return ({ error: error, status: 500 });
        }
        return (data);
    } catch (error) {
        return ({ error: error, status: 500 });
    }
}

export const getCoursesBetweenDates = async (req: NextRequest, start: string, end: string) => {
    try {
        const courses = await Course.find({
            createdAt: {
                $gte: new Date(start),
                $lte: new Date(end),
            },
            isDeleted: false,
        });
        return courses;
    } catch (error) {
        throw new Error("Failed to filter courses by date");
    }
};

export async function getCourses(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const _title = searchParams.get('title') || '';
        const sortOrder = searchParams.get('sortOrder') || 'asc';
        const level = searchParams.get('level') || '';
        const matchFilter: Record<string, any> = { isPrivate: false };

        if (_title) {
            matchFilter.title = { $regex: _title, $options: 'i' };
        }
        if (level) {
            matchFilter.level = level;
        }

        const sortDirection = sortOrder === 'desc' ? -1 : 1;
        const coursesWithChaptersAndVideos = await Course.aggregate([
            { $match: matchFilter },
            {
                $lookup: {
                    from: 'chapters',
                    localField: 'chapters',
                    foreignField: '_id',
                    as: 'chapters'
                }
            },
            {
                $unwind: {
                    path: '$chapters',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'videos',
                    localField: 'chapters.videos',
                    foreignField: '_id',
                    as: 'chapters.videos'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'username'
                }
            },
            {
                $unwind: {
                    path: '$username',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: '$_id',
                    user_id: { $first: '$user_id' },
                    user_name: { $first: "$username.name" },
                    title: { $first: '$title' },
                    level: { $first: '$level' },
                    description: { $first: '$description' },
                    totalVideosTiming: { $first: '$totalVideosTiming' },
                    images: { $first: '$images' },
                    chapters: { $push: '$chapters' }
                }
            },
            {
                $addFields: {
                    lowercasedField: { $toLower: '$title' }
                }
            },
            { $sort: { lowercasedField: sortDirection } }
        ]);
        return { courses: coursesWithChaptersAndVideos, status: 200 };
    } catch (error) {
        return { err: (error as Error).message, status: 500 };
    }
}

export async function getCourseById(req: NextRequest, id: string) {
    try {
        const matchFilter: Record<string, any> = { _id: new mongoose.Types.ObjectId(id), isPrivate: false };
        const coursesWithChaptersAndVideos = await Course.aggregate([
            { $match: matchFilter },
            {
                $lookup: {
                    from: 'chapters',
                    localField: 'chapters',
                    foreignField: '_id',
                    as: 'chapters'
                }
            },
            {
                $unwind: {
                    path: '$chapters',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'videos',
                    localField: 'chapters.videos',
                    foreignField: '_id',
                    as: 'chapters.videos'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    user_id: { $first: '$user_id' },
                    title: { $first: '$title' },
                    level: { $first: '$level' },
                    description: { $first: '$description' },
                    totalVideosTiming: { $first: '$totalVideosTiming' },
                    images: { $first: '$images' },
                    chapters: { $push: '$chapters' }
                }
            },
        ]);
        return { result: coursesWithChaptersAndVideos[0] || null, status: 200 };
    } catch (error) {
        return ({ error: (error as Error).message, status: 500 })
    }
}

export async function addPurchaseCourse(req: NextRequest, purchaseCourse: IPurchasedCourse) {

    const fieldsRequire = 'userId and courseId are required';
    const courseNotFound = 'Course not found'
    const courseAlreadyExist = 'This course is already purchased'
    try {
        const { userId, courseId } = purchaseCourse;
        if (!userId || !courseId) throw new Error(fieldsRequire);

        const course = await Course.findById(courseId);
        if (!course) throw new Error(courseNotFound);

        const existPurchasedCourse = await PurchasedCourse.findOne({ userId, courses: courseId });
        const userPurchases = await PurchasedCourse.findOneAndUpdate(
            { userId },
            { $addToSet: { courses: courseId } },
            { new: true, upsert: true }
        );

        if (existPurchasedCourse) return { error: courseAlreadyExist, status: 403 };

        return { userPurchases, status: 200 };
    } catch (error) {
        return { error: (error as Error).message, status: 500 }
    }
}

export async function getPurchasedCoursesWithDetails(req: NextRequest, userId: string) {

    const courseNotPurchased = 'No courses purchased yet'
    try {
        const userPurchases = await PurchasedCourse.findOne({ userId });
        if (!userPurchases || !userPurchases.courses.length) {
            return { result: [], status: 200, message: courseNotPurchased };
        }
        const coursesWithDetails = await Course.aggregate([
            { $match: { _id: { $in: userPurchases.courses.map((id: string) => new mongoose.Types.ObjectId(id)) } } },
            {
                $lookup: {
                    from: 'chapters',
                    localField: 'chapters',
                    foreignField: '_id',
                    as: 'chapters'
                }
            },
            {
                $unwind: {
                    path: '$chapters',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'videos',
                    localField: 'chapters.videos',
                    foreignField: '_id',
                    as: 'chapters.videos'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'username'
                }
            },
            {
                $unwind: {
                    path: '$username',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: '$_id',
                    title: { $first: '$title' },
                    user_name: { $first: "$username.name" },
                    level: { $first: '$level' },
                    description: { $first: '$description' },
                    totalVideosTiming: { $first: '$totalVideosTiming' },
                    images: { $first: '$images' },
                    chapters: { $push: '$chapters' }
                }
            }
        ]);
        return { courses: coursesWithDetails, status: 200 };
    } catch (error) {
        return { error: (error as Error).message, status: 500 };
    }
}
