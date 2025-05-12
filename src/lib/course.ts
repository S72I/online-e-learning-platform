import { NextRequest } from "next/server";
import DBConnection from "@/backend/dbConfig/dbConfig";
import Course from "@/backend/models/course.mode";
import { validateUser } from "@/backend/middlewares/validateTokenHandler";

export async function createCourse(req: NextRequest, courseData: any) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return { error: "Unauthorized: No token provided", status: 401 };
        }

        await DBConnection();

        const { title, description, level, images, chapters } = courseData;

        if (!title || !description || !level || !images || !chapters) {
            return { error: "All fields are mandatory", status: 400 };
        }

        let user = validateUser(req);

        const course = await Course.create({
            user_id: user.id,
            title,
            description,
            level,
            images,
            chapters,
        });

        return { course, status: 201 };
    } catch (error: any) {
        return { error: error.message || "Something went wrong", status: 500 };
    }
}

export async function deleteCourseById(req: NextRequest, id: string) {
    try {
        await DBConnection();

        const user = validateUser(req);

        const findId = await Course.findById(id);

        if (findId.isDeleted) {
            return { message: "course not exist try again", status: 400 };
        }

        if (String(findId.user_id) == user.id) {

            if (user.role == "admin") {

                const course = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

                if (!course) return { message: "Course not found", status: 404 };

                return { message: "Course deleted", status: 200 };
            } else {
                return { error: "you're not a valid user", status: 400 };
            }
        }
        else {
            return { error: "The user Id not matching", status: 400 };
        }

    } catch (error: any) {
        return { err: error.message, status: 400 };
    }
}

export async function getCourseById(req: NextRequest, id: string) {
    try {
        const user = validateUser(req);

        await DBConnection();
        const findId = await Course.findById(id);

        if (!findId) return { message: "Course not found", status: 404 };

        if (findId.isDeleted) {
            return { message: "course not exist try again", status: 400 };
        }
        if (String(findId.user_id) == user.id) {

            if (user.role == "admin") {

                return { findId, status: 200 };
            } else {
                return { error: "you're not a valid user", status: 400 };
            }
        }

    } catch (error: any) {
        return { err: error.message, status: 400 };
    }
}

export async function getCourses(req: NextRequest, { title, sortOrder }: { title: string, sortOrder: 'asc' | 'desc' }) {
    try {
        // const user = validateUser(req);

        // !user ? "User invalid" : ""

        await DBConnection();

        const regexPattern: RegExp = new RegExp("^" + title, "i");

        const sortDirection = sortOrder === 'asc' ? 1 : -1;

        const courses = await Course.find({ title: { $regex: regexPattern }, isDeleted: false })
            .sort({ title: sortDirection });

        if (!courses.length) {
            return { err: "No courses found matching your criteria", status: 404 };
        }
        return { courses, status: 200 };
    } catch (error: any) {
        return { err: error.message, status: 400 };
    }
}

export async function updateCourseById(req: NextRequest, id: string, courseData: any) {
    try {
        const user = validateUser(req);

        await DBConnection();

        const findId = await Course.findById(id);

        if (!findId) {
            return { message: "Course not found", status: 404 };
        }

        if (findId.isDeleted) {
            return { message: "course not exist try again", status: 400 };
        }

        if (String(findId.user_id) == user.id) {

            if (user.role == "admin") {
                const updatedCourse = await Course.findByIdAndUpdate(id, courseData, { new: true });

                if (!updatedCourse) {
                    return { message: "Course update failed", status: 400 };
                }

                return { message: "Course updated", updatedCourse, status: 200 };
            } else {
                return { error: "you're not a valid user", status: 400 };
            }
        }
    } catch (error: any) {
        return { err: error.message, status: 400 };
    }
}

export async function getAllCourses(req: NextRequest) {
    try {

        await DBConnection();

        const courses = await Course.find({ isDeleted: false });

        if (!courses.length) {
            return { err: "No courses found", status: 404 };
        }
        
        return { courses: courses };

    } catch (error: any) {
        return { err: error.message, status: 400 };
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

