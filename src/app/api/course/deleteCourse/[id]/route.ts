import DBConnection from "@/backend/dbConfig/dbConfig";
import Course from "@/backend/models/course.mode";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        DBConnection()
        const id = params.id;
        const course = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

        if (course) return NextResponse.json({ message: "Course deleted", status: 200 })

        if (!course) return NextResponse.json({ message: "Course not found", status: 404 })


    } catch (error: any) {
        return NextResponse.json({ err: error.message, status: 400 })
    }
} 