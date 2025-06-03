import { NextRequest } from "next/server";
import { EmailBody, ICourse, ICourseInput, User } from "../interfaces";
import { validateUser } from "../middlewares/validateTokenHandler";

import { FilterQuery, Types } from "mongoose";
import { Resend } from "resend";
import Chapter from "../models/chapterColl.model";
import Video from "../models/videosColl.model";
import DBConnection from "../dbConfig/dbConfig";
import { Course } from "../models/course.model";

DBConnection()
//private 

// export async function createCourse(req: NextRequest, courseData: ICourse) {
//     try {
//         const {
//             title,
//             level,
//             description,
//             totalVideosTiming,
//             images,
//             chapters,
//         } = courseData;

//         if (
//             !title ||
//             !description ||
//             !level ||
//             !totalVideosTiming ||
//             !images?.length ||
//             !chapters
//         ) {
//             return { error: 'All fields are mandatory', status: 400 };
//         }

//         const user = validateUser(req);
//         if (!user?.id) {
//             return { error: 'JWT expired', status: 498 };
//         }

//         const course = await Course.create({
//             user_id: user.id,
//             title,
//             description,
//             level,
//             totalVideosTiming,
//             images,
//             chapters,
//         });

//         return { course, status: 201 };
//     } catch (error) {
//         console.error('Error creating course:', error);
//         return { error: (error as Error).message || 'Something went wrong', status: 500 };
//     }
// }




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
                videos_id: [],
            });

            for (const _video of _chapter.videos) {
                const video = await Video.create({
                    chapter_id: chapter._id,
                    videoTitle: _video.videoTitle,
                    description: _video.description,
                    videoUri: _video.videoUri,
                    videoTiming: _video.videoTiming,
                });
                chapter.videos_id.push(video._id);
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
    const chapters = await Chapter.find({ course: id });
    const chapterIds = chapters.map(ch => ch._id);

    // 2. Delete all videos in those chapters
    await Video.deleteMany({ chapter: { $in: chapterIds } });

    // 3. Delete all chapters for this course
    await Chapter.deleteMany({ course: id });

    // 4. Delete the course itself
    await Course.findByIdAndDelete(id);

    return { message: "Course and all related chapters and videos deleted", status: 200 };

  } catch (error) {
    console.error("Error deleting course:", error);
    return { error: (error as Error).message || "Something went wrong", status: 500 };
  }
}

 
export async function getUserCourseById(req: NextRequest, id: string) {
    try {

        const user = validateUser(req);

        const findId = await Course.findById(id);

        if (!findId) return { message: "Course not found", status: 404 };

        if (findId.isDeleted) return { message: "course not exist try again", status: 400 };

        if (user.id == findId.user_id) {
            return { result: findId, status: 200 };
        } else {
            return { error: "The course not found in courrent user course list", status: 404 }
        }

    } catch (error) {
        return { err: error, status: 400 };
    }
}

export async function getCoursesByAdmin(req: NextRequest) {
    try {

        const { searchParams } = new URL(req.url);
        const title = searchParams.get('title') || '';
        const sortOrder = searchParams.get('sortOrder') || '';
        const level = searchParams.get('level') || '';


        console.log("title", title);


        const user = validateUser(req);

        const query: FilterQuery<ICourse> = { user_id: user.id, isDeleted: false };

        if (title) {
            const regexPattern = new RegExp('^' + title, 'i');
            query.title = { $regex: regexPattern };
        }
        if (level) {
            query.level = level;
        }

        let courseQuery = Course.find(query);

        if (sortOrder === 'asc' || sortOrder === 'desc') {
            const sortDirection = sortOrder === 'asc' ? 1 : -1;
            courseQuery = courseQuery.sort({ title: sortDirection });
        }

        const courses = await courseQuery.exec();

        if (!courses.length) {
            return { err: 'No courses found', status: 404 };
        }

        return { courses, status: 200 };
    } catch (error) {
        return { err: (error as Error).message, status: 500 };
    }
}


export async function updateCourse(
    req: NextRequest,
    courseId: string,
    courseData: ICourseInput
) {
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

        for (const _chapter of chapters) {
            let chapter;
            if (_chapter._id) {
                // Update and get the updated chapter
                chapter = await Chapter.findByIdAndUpdate(
                    _chapter._id,
                    { title: _chapter.title },
                    { new: true }
                );
                if (!chapter) continue;
            } else {
                // Create new chapter
                chapter = await Chapter.create({
                    course_id: course._id,
                    title: _chapter.title,
                    videos_id: [],
                });
            }

            const updatedVideoIds: Types.ObjectId[] = [];
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

            // Delete videos not present in updatedVideoIds
            await Video.deleteMany({
                chapter_id: chapter._id,
                _id: { $nin: updatedVideoIds }
            });

            chapter.videos = updatedVideoIds;
            await chapter.save();
            updatedChapterIds.push(chapter._id);
        }

        // Delete chapters not present in updatedChapterIds
        await Chapter.deleteMany({
            course_id: course._id,
            _id: { $nin: updatedChapterIds }
        });

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



// export async function updateCourse(req: NextRequest, courseId: string, courseData: ICourseInput) {
//     try {
//         const {
//             title,
//             level,
//             description,
//             totalVideosTiming,
//             images,
//             chapters,
//         } = courseData;

//         if (
//             !title ||
//             !description ||
//             !level ||
//             !totalVideosTiming ||
//             !images?.length ||
//             !chapters?.length
//         ) {
//             return { error: 'All fields are mandatory', status: 400 };
//         }

//         const user = validateUser(req);
//         if (!user?.id) {
//             return { error: 'JWT expired', status: 498 };
//         }

//         const course = await Course.findById(courseId);
//         if (!course) return { error: "Course not found", status: 404 };

//         course.title = title;
//         course.level = level;
//         course.description = description;
//         course.totalVideosTiming = totalVideosTiming;
//         course.images = images;

//         const updatedChapterIds: any[] = [];

//         for (const _chapter of chapters) {
//             let chapter;
//             if (_chapter._id) {
//                 chapter = await Chapter.findById(_chapter._id);
//                 if (!chapter) continue;
//                 chapter.title = _chapter.title;
//                 await chapter.save();
//             } else {
//                 chapter = await Chapter.create({
//                     course_id: course._id,
//                     title: _chapter.title,
//                     videos_id: [],
//                 });
//                 await chapter.save();
//             }

//             const updatedVideoIds: any[] = [];
//             for (const _video of _chapter.videos) {
//                 let video;
//                 if (_video._id) {
//                     video = await Video.findById(_video._id);
//                     if (!video) continue;
//                     video.videoTitle = _video.videoTitle;
//                     video.description = _video.description;
//                     video.videoUri = _video.videoUri;
//                     video.videoTiming = _video.videoTiming;

//                     await Video.findByIdAndUpdate(_video._id, video)
//                     await video.save();
//                 } else {
//                     video = await Video.create({
//                         chapter_id: chapter._id,
//                         videoTitle: _video.videoTitle,
//                         description: _video.description,
//                         videoUri: _video.videoUri,
//                         videoTiming: _video.videoTiming,
//                     });
//                     await video.save();
//                 }
//                 updatedVideoIds.push(video._id);
//             }
//             chapter.videos_id = updatedVideoIds;
//             await chapter.save();
//             updatedChapterIds.push(chapter._id);
//         }

//         course.chapters = updatedChapterIds;
//         await course.save();

//         return { course, status: 200 };
//     } catch (error) {
//         console.error('Error updating course:', error);
//         return { error: (error as Error).message || 'Something went wrong', status: 500 };
//     }
// }



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
        const title = searchParams.get('title') || '';
        const sortOrder = searchParams.get('sortOrder') || '';

        let query: FilterQuery<User> = { isDeleted: false };

        if (title) {
            const regexPattern: RegExp = new RegExp('^' + title, 'i');
            query.title = { $regex: regexPattern };
        }

        let courseQuery = Course.find(query);

        if (sortOrder === 'asc' || sortOrder === 'desc') {
            const sortDirection = sortOrder === 'asc' ? 1 : -1;
            courseQuery = courseQuery.sort({ title: sortDirection });
        }

        const courses = await courseQuery.exec();

        if (!courses.length) {
            return ({ err: 'No courses found', status: 404 });
        }

        return ({ courses, status: 200 });
    } catch (error) {
        return ({ err: (error as Error).message, status: 500 });
    }
}

export async function getCourseById(req: NextRequest, id: string) {
    try {


        const findId = await Course.findById(id);

        if (!findId) return { message: "Course not found", status: 404 };

        if (findId.isDeleted) return { message: "course not exist try again", status: 400 };

        return { result: findId, status: 200 };


    } catch (error) {
        return { err: error, status: 400 };
    }
}


