import { getCoursesByAdmin } from "@/lib/course";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const result = await getCoursesByAdmin(req);
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ err: error.message, status: 400 });
    }
}
