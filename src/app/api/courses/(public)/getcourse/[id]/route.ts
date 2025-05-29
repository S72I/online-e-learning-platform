import { getCourseById } from "@/server/controllers/course.controller";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const result = await getCourseById(req, id);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ err: error, status: 400 });
    }
}
