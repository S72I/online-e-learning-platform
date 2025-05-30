// import { NextRequest, NextResponse } from "next/server";
// import DBConnection from "@/server/dbConfig/dbConfig";
// import Course from "@/server/models/course.mode";
// import { validateUser } from "@/server/middlewares/validateTokenHandler";
// import { FilterQuery } from "mongoose";
// import { courseObj } from "@/server/constants";

// interface CreateCourse {
//     courseEducator: string;
//     title: string;
//     description: string;
//     level: string;
//     totalVideosTiming: string;
//     images: string[];
//     chapters: Record<string, any>;
// }

// export async function createCourse(req: NextRequest, courseData: any) {
//     try {
//         await DBConnection();

//         const {
//             courseEducator,
//             title,
//             description,
//             level,
//             totalVideosTiming,
//             images,
//             chapters,
//         } = courseData as CreateCourse;

//         if (
//             !courseEducator ||
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
//             courseEducator,
//             title,
//             description,
//             level,
//             totalVideosTiming,
//             images,
//             chapters,
//         });

//         return { course, status: 201 };
//     } catch (error: any) {
//         console.error('Error creating course:', error);
//         return { error: error.message || 'Something went wrong', status: 500 };
//     }
// }

// export async function deleteCourseById(req: NextRequest, id: string) {
//     try {
//         await DBConnection();

//         const user = validateUser(req);

//         const findId = await Course.findById(id);

//         if (findId?.isDeleted) {
//             return { message: "course not exist try again", status: 400 };
//         }

//         if (String(findId?.user_id) == user.id) {

//             if (user.role == "admin") {

//                 const course = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

//                 if (!course) return { message: "Course not found", status: 404 };

//                 return { message: "Course deleted", status: 200 };
//             } else {
//                 return { error: "you're not a valid user", status: 400 };
//             }
//         }
//         else {
//             return { error: "The user Id not matching", status: 400 };
//         }

//     } catch (error: any) {
//         return { err: error.message, status: 400 };
//     }
// }

// export async function getCourseById(req: NextRequest, id: string) {
//     try {
//         const user = validateUser(req);

//         await DBConnection();
//         const findId = await Course.findById(id);

//         if (!findId) return { message: "Course not found", status: 404 };

//         if (findId.isDeleted) {
//             return { message: "course not exist try again", status: 400 };
//         }
//         if (String(findId.user_id) == user.id) {

//             if (user.role == "admin") {

//                 return { findId, status: 200 };
//             } else {
//                 return { error: "you're not a valid user", status: 400 };
//             }
//         }

//     } catch (error: any) {
//         return { err: error.message, status: 400 };
//     }
// }


// export async function getUserCourseById(req: NextRequest, id: string) {
//     try {

//         await DBConnection();
//         const findId = await Course.findById(id);

//         if (!findId) return { message: "Course not found", status: 404 };

//         if (findId.isDeleted) {
//             return { message: "course not exist try again", status: 400 };
//         }

//         return { findId, status: 200 };


//     } catch (error: any) {
//         return { err: error.message, status: 400 };
//     }
// }


// export async function getCourses(req: NextRequest, { title, sortOrder }: { title: string, sortOrder: 'asc' | 'desc' }) {
//     try {
//         // const user = validateUser(req);

//         // !user ? "User invalid" : ""

//         await DBConnection();

//         const regexPattern: RegExp = new RegExp("^" + title, "i");

//         const sortDirection = sortOrder === 'asc' ? 1 : -1;

//         const courses = await Course.find({ title: { $regex: regexPattern }, isDeleted: false })
//             .sort({ title: sortDirection });

//         if (!courses.length) {
//             return { err: "No courses found matching your criteria", status: 404 };
//         }
//         return { courses, status: 200 };
//     } catch (error: any) {
//         return { err: error.message, status: 400 };
//     }
// }

// export async function updateCourseById(req: NextRequest, id: string, courseData: any) {
//     try {
//         const user = validateUser(req);

//         await DBConnection();

//         const findId = await Course.findById(id);

//         if (!findId) {
//             return { message: "Course not found", status: 404 };
//         }

//         if (findId.isDeleted) {
//             return { message: "course not exist try again", status: 400 };
//         }

//         if (String(findId.user_id) == user.id) {

//             if (user.role == "admin") {
//                 const updatedCourse = await Course.findByIdAndUpdate(id, courseData, { new: true });

//                 if (!updatedCourse) {
//                     return { message: "Course update failed", status: 400 };
//                 }

//                 return { message: "Course updated", updatedCourse, status: 200 };
//             } else {
//                 return { error: "you're not a valid user", status: 400 };
//             }
//         }
//     } catch (error: any) {
//         return { err: error.message, status: 400 };
//     }
// }

// export async function getAllCourses(req: NextRequest) {
//     try {

//         await DBConnection();

//         const courses = await Course.find({ isDeleted: false });

//         if (!courses.length) {
//             return { err: "No courses found", status: 404 };
//         }

//         return { courses: courses };

//     } catch (error: any) {
//         return { err: error.message, status: 400 };
//     }

// }

// export const getCoursesBetweenDates = async (req: NextRequest, start: string, end: string) => {
//     try {

//         const courses = await Course.find({
//             createdAt: {
//                 $gte: new Date(start),
//                 $lte: new Date(end),
//             },
//             isDeleted: false,
//         });

//         return courses;
//     } catch (error) {
//         throw new Error("Failed to filter courses by date");
//     }
// };


// export async function getCoursesByUser(req: NextRequest) {
//     try {
//         await DBConnection();

//         const { searchParams } = new URL(req.url);
//         const title = searchParams.get('title') || '';
//         const sortOrder = searchParams.get('sortOrder') || '';

//         let query: any = { isDeleted: false };

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
//     } catch (error: any) {
//         return ({ err: error.message, status: 500 });
//     }
// }


// // export async function getCoursesByAdmin(req: NextRequest) {
// //     try {
// //         await DBConnection();

// //         const user = await validateUser(req);

// //         const courses = await Course.find({ isDeleted: false, user_id: user.id })

// //         return { courses: courses, status: 200 };

// //     } catch (error: any) {
// //         return new Response(JSON.stringify({ error: error.message }), {
// //             status: 500,
// //             headers: { 'Content-Type': 'application/json' },
// //         });
// //     }
// // }


// export async function getCoursesByAdmin(req: NextRequest) {
//     try {
//         await DBConnection();

//         const { searchParams } = new URL(req.url);
//         const title = searchParams.get('title') || '';
//         const sortOrder = searchParams.get('sortOrder') || '';

//         const user = validateUser(req);

//         const query: FilterQuery<courseObj> = { user_id: user.id, isDeleted: false };

//         if (title) {
//             const regexPattern = new RegExp('^' + title, 'i');
//             query.title = { $regex: regexPattern };
//         }

//         let courseQuery = Course.find(query);

//         if (sortOrder === 'asc' || sortOrder === 'desc') {
//             const sortDirection = sortOrder === 'asc' ? 1 : -1;
//             courseQuery = courseQuery.sort({ title: sortDirection });
//         }

//         const courses = await courseQuery.exec();

//         if (!courses.length) {
//             return { err: 'No courses found', status: 404 };
//         }

//         return { courses, status: 200 };
//     } catch (error) {
//         return { err: (error as Error).message, status: 500 };
//     }
// }



