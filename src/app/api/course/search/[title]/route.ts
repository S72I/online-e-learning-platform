import Course from "@/backend/models/course.mode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { title: string } }) {
    const { title }: { title?: string } = params;

    const regexPattern: RegExp = new RegExp(`${title}`);

    const query: { title?: { $regex: RegExp } } = {};

    if (title) query.title = { $regex: regexPattern };

    const course = await Course.find(query);

    if (!course.length) {
        return NextResponse.json({ err: "No tasks found matching your criteria", status: 404 });
    }
    return NextResponse.json({ course, status: 200 });

}
