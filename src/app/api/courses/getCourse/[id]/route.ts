import { getCourseById } from "@/lib/course";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const result = await getCourseById(req, params.id);
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ err: error.message, status: 400 });
    }
}
