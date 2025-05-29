import { NextRequest } from "next/server";
import { Course, EmailBody, User } from "../constants";
import { validateUser } from "../middlewares/validateTokenHandler";

import { FilterQuery } from "mongoose";
import CourseModel from "../models/course.mode";
import DBConnection from "../dbConfig/dbConfig";
import { Resend } from "resend";

// await DBConnection();

//private endpoints
export async function createCourse(req: NextRequest, courseData: Course) {
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
            !chapters
        ) {
            return { error: 'All fields are mandatory', status: 400 };
        }

        const user = validateUser(req);
        if (!user?.id) {
            return { error: 'JWT expired', status: 498 };
        }

        const course = await CourseModel.create({
            user_id: user.id,
            title,
            description,
            level,
            totalVideosTiming,
            images,
            chapters,
        });

        return { course, status: 201 };
    } catch (error) {
        console.error('Error creating course:', error);
        return { error: error || 'Something went wrong', status: 500 };
    }
}

export async function deleteCourse(req: NextRequest, id: string) {
    try {
        await DBConnection();

        const user = validateUser(req);

        const findId = await CourseModel.findById(id);

        if (findId?.isDeleted) {
            return { message: "course not exist try again", status: 400 };
        }

        if (String(findId?.user_id) == user.id) {

            if (user.role == "admin") {

                const course = await CourseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

                if (!course) return { message: "Course not found", status: 404 };

                return { message: "Course deleted", status: 200 };
            } else {
                return { error: "you're not a valid user", status: 400 };
            }
        }
        else {
            return { error: "The user Id not matching", status: 400 };
        }

    } catch (error) {
        return { err: error, status: 400 };
    }
}

export async function getUserCourseById(req: NextRequest, id: string) {
    try {

        await DBConnection();

        const user = validateUser(req);

        const findId = await CourseModel.findById(id);

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
        await DBConnection();

        const { searchParams } = new URL(req.url);
        const title = searchParams.get('title') || '';
        const sortOrder = searchParams.get('sortOrder') || '';


        console.log("title", title);


        const user = validateUser(req);

        const query: FilterQuery<Course> = { user_id: user.id, isDeleted: false };

        if (title) {
            const regexPattern = new RegExp('^' + title, 'i');
            query.title = { $regex: regexPattern };
        }

        let courseQuery = CourseModel.find(query);

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

export async function updateCourse(req: NextRequest, id: string, courseData: User) {
    try {

        await DBConnection();

        const user = validateUser(req);

        const findId = await CourseModel.findById(id);

        if (!findId) {
            return { message: "Course not found", status: 404 };
        }

        if (findId.isDeleted) {
            return { message: "course not exist try again", status: 400 };
        }

        if (String(findId.user_id) == user.id) {

            if (user.role == "admin") {
                const updatedCourse = await CourseModel.findByIdAndUpdate(id, courseData, { new: true });

                if (!updatedCourse) {
                    return { message: "Course update failed", status: 400 };
                }

                return { message: "Course updated", updatedCourse, status: 200 };
            } else {
                return { error: "you're not a valid user", status: 400 };
            }
        }
    } catch (error) {
        return { err: (error as Error).message, status: 400 };
    }
}

//publice endpoints 

export async function getCourses(req: NextRequest) {
    try {
        await DBConnection();

        const { searchParams } = new URL(req.url);
        const title = searchParams.get('title') || '';
        const sortOrder = searchParams.get('sortOrder') || '';

        let query: FilterQuery<User> = { isDeleted: false };

        if (title) {
            const regexPattern: RegExp = new RegExp('^' + title, 'i');
            query.title = { $regex: regexPattern };
        }

        let courseQuery = CourseModel.find(query);

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

        const courses = await CourseModel.find({
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


export async function getCourseById(req: NextRequest, id: string) {
    try {

        await DBConnection();

        const findId = await CourseModel.findById(id);

        if (!findId) return { message: "Course not found", status: 404 };

        if (findId.isDeleted) return { message: "course not exist try again", status: 400 };

        return { result: findId, status: 200 };


    } catch (error) {
        return { err: error, status: 400 };
    }
}


