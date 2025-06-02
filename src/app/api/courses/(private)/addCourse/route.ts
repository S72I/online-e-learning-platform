import { createCourse } from "@/server/controllers/course.controller";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        console.log("body", body);

        const result = await createCourse(request, body);
        return NextResponse.json(result, { status: result.status });
    } catch (error) {
        return NextResponse.json({ err: error, status: 400 });
    }
}
