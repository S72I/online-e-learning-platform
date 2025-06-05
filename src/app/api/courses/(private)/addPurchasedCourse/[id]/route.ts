import { purchasedCourse, updateCourse } from "@/server/controllers/course.controller";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const result = await purchasedCourse(request, id);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ err: (error as Error).message, status: 400 });
    }
}
