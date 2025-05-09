import { NextRequest, NextResponse } from "next/server";
import Course from "@/backend/models/course.mode";
import DBConnection from "@/backend/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
    try {
        DBConnection()
        const { title, level, description, images, chapters } = await request.json();

        if (!title || !description || !level || !images || !chapters) {
            return NextResponse.json({ err: "All fields are mandatory", status: 400 });
        } else {
            const course = await Course.create({
                // user_id: req.user.id,
                title,
                description,
                level,
                images,
                chapters
            });
            return NextResponse.json({ course: course, status: 200 });
        }
    } catch (error: any) {
        return NextResponse.json({ err: error.message, status: 400 })
    }
}