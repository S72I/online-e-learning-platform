import { getPurchasedCoursesWithDetails } from "@/server/controllers/course.controller";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const courses = await getPurchasedCoursesWithDetails(request, id);
        return NextResponse.json(courses, { status: 200 });
    } catch (error) {
        return NextResponse.json({ err: (error as Error).message, status: 400 });
    }
}
