import Course from "@/server/models/course.mode";
import { getCourses } from "@/lib/course";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest, { params }: { params: { title: string } }) {
//     const { title }: { title?: string } = params;

//     const regexPattern: RegExp = new RegExp(`${title}`);

//     const query: { title?: { $regex: RegExp } } = {};

//     if (title) query.title = { $regex: regexPattern };

//     const course = await Course.find(query);

//     if (!course.length) {
//         return NextResponse.json({ err: "No tasks found matching your criteria", status: 404 });
//     }
//     return NextResponse.json({ course, status: 200 });

// }


export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const title = url.searchParams.get("title") || "";
        const sortOrder = url.searchParams.get("sortOrder") === "desc" ? "desc" : "asc";

        const result = await getCourses(request, { title, sortOrder });

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ err: error.message, status: 400 });
    }
}