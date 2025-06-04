import { NextRequest } from "next/server";
import { EmailBody, ICourse, ICourseInput, User } from "../interfaces";
import { validateUser } from "../middlewares/validateTokenHandler";

import mongoose, { FilterQuery, Types } from "mongoose";
import { Resend } from "resend";
import Chapter from "../models/chapterColl.model";
import Video from "../models/videosColl.model";
import DBConnection from "../dbConfig/dbConfig";
import { Course } from "../models/course.model";

DBConnection()
//private 

export async function createCourse(req: NextRequest, courseData: ICourseInput) {
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
            return { error: 'All fields are mandatory', status: 400 };
        }

        const user = validateUser(req);
        if (!user?.id) {
            return { error: 'JWT expired', status: 498 };
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
        console.error('Error creating course:', error);
        return { error: (error as Error).message || 'Something went wrong', status: 500 };
    }
}

export async function deleteCourse(req: NextRequest, id: string) {
    try {
        const user = validateUser(req);
        if (!user?.id) {
            return { error: "Invalid user", status: 401 };
        }

        const course = await Course.findById(id);

        if (!course || course.isDeleted) {
            return { message: "Course does not exist. Try again.", status: 404 };
        }

        // Only allow delete if user is admin and is the owner
        if (String(course.user_id) !== user.id) {
            return { error: "The user ID does not match.", status: 403 };
        }

        if (user.role !== "admin") {
            return { error: "You're not authorized to delete this course.", status: 403 };
        }

        // --- Cascade Delete Logic ---

        // 1. Find all chapters for this course
        const chapters = await Chapter.find({ course_id: id });
        const chapterIds = chapters.map(ch => ch._id);

        // 2. Delete all videos in those chapters
        await Video.deleteMany({ chapter_id: { $in: chapterIds } });

        // 3. Delete all chapters for this course
        await Chapter.deleteMany({ course_id: id });

        // 4. Delete the course itself
        await Course.findByIdAndDelete(id);

        return { message: "Course and all related chapters and videos deleted", status: 200 };

    } catch (error) {
        console.error("Error deleting course:", error);
        return { error: (error as Error).message || "Something went wrong", status: 500 };
    }
}

// export async function getUserCourseById(req: NextRequest, id: string) {
//     try {

//         const user = validateUser(req);

//         const findId = await Course.findById(id);

//         if (!findId) return { message: "Course not found", status: 404 };

//         if (findId.isDeleted) return { message: "course not exist try again", status: 400 };

//         if (user.id == findId.user_id) {
//             return { result: findId, status: 200 };
//         } else {
//             return { error: "The course not found in courrent user course list", status: 404 }
//         }

//     } catch (error) {
//         return { err: error, status: 400 };
//     }
// }

export async function getUserCourseById(req: NextRequest, id: string) {
    try {
        const user = await validateUser(req);

        const course = await Course.findById(id);

        if (!course) {
            return { error: 'Course not found', status: 404 };
        }

        if (user.id !== course.user_id.toString()) {
            return { error: 'Unauthorized access', status: 403 };
        }

        const matchFilter = {
            _id: new mongoose.Types.ObjectId(id),
            user_id: new mongoose.Types.ObjectId(user.id),
        };

        console.log("courseId", matchFilter._id);


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

// export async function getCoursesByAdmin(req: NextRequest) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const title = searchParams.get('title') || '';
//         const sortOrder = searchParams.get('sortOrder') || '';
//         const level = searchParams.get('level') || ''

//         const user = validateUser(req);
//         const query: FilterQuery<ICourseInput> = { user_id: user.id };
//         if (title) {
//             const regexPattern = new RegExp('^' + title, 'i');
//             query.title = { $regex: regexPattern };
//         }

//         // const courses = await Course.find({ user_id: user.id });
//         let  courseQuery = await Course.find(query);

//         if (sortOrder === 'asc' || sortOrder === 'desc') {
//             const sortDirection = sortOrder === 'asc' ? 1 : -1;
//             courseQuery = courseQuery.sort({ title: sortDirection });
//         }

//         const courses = await courseQuery.exec();



//         const coursesWithChaptersAndVideos = await Promise.all(
//             courses.map(async (course: any) => {
//                 const chapters = await Chapter.find({ _id: { $in: course.chapters } });

//                 const chaptersWithVideos = await Promise.all(
//                     chapters.map(async (chapter: any) => {
//                         const videos = await Video.find({ _id: { $in: chapter.videos_id } });
//                         return { ...chapter.toObject(), videos };
//                     })
//                 );

//                 return { ...course.toObject(), chapters: chaptersWithVideos };
//             })
//         );

//         return { courses: coursesWithChaptersAndVideos, status: 200 };
//     } catch (error) {
//         return { err: (error as Error).message, status: 500 };
//     }
// }

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
            return { error: "All fields are mandatory", status: 400 };
        }

        const user = validateUser(req);
        if (!user?.id) {
            return { error: "JWT expired", status: 498 };
        }

        const course = await Course.findById(courseId);
        if (!course) return { error: "Course not found", status: 404 };

        course.title = title;
        course.level = level;
        course.description = description;
        course.totalVideosTiming = totalVideosTiming;
        course.images = images;

        const updatedChapterIds: Types.ObjectId[] = [];

        // const incomingChapterIds = chapters.filter(c => c._id).map(c => c._id?.toString());

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
            // const incomingVideoIds = _chapter.videos.filter(v => v._id).map(v => v._id?.toString());

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
        console.error("Error updating course:", error);
        return {
            error: (error as Error).message || "Something went wrong",
            status: 500,
        };
    }
}

//publice endpoints 

export async function contact(req: NextRequest, emailBody: EmailBody) {

    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log("resend", resend);

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

        console.log("data", data);

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

        const matchFilter: Record<string, any> = {};

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

// export async function getCourses(req: NextRequest) {
//     try {

//         const { searchParams } = new URL(req.url);
//         const title = searchParams.get('title') || '';
//         const sortOrder = searchParams.get('sortOrder') || '';

//         let query: FilterQuery<User> = { isDeleted: false };

//         if (title) {
//             const regexPattern: RegExp = new RegExp('^' + title, 'i');
//             query.title = { $regex: regexPattern };
//         }

//         let courseQuery = Course.find(query);

//         if (sortOrder === 'asc' || sortOrder === 'desc') {
//             const sortDirection = sortOrder === 'asc' ? 1 : -1;
//             courseQuery = courseQuery.sort({ title: sortDirection });
//         }

//         const courses = await courseQuery.exec();

//         if (!courses.length) {
//             return ({ err: 'No courses found', status: 404 });
//         }

//         return ({ courses, status: 200 });
//     } catch (error) {
//         return ({ err: (error as Error).message, status: 500 });
//     }
// }

export async function getCourseById(req: NextRequest, id: string) {

    try {
        const coursesWithChaptersAndVideos = await Course.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
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


