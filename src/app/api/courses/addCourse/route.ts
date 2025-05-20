import { NextRequest, NextResponse } from "next/server";
import { createCourse } from "@/lib/course";

// export async function POST(request: NextRequest) {
//     try {
//         DBConnection()
//         const { title, level, description, images, chapters } = await request.json();

//         if (!title || !description || !level || !images || !chapters) {
//             return NextResponse.json({ err: "All fields are mandatory", status: 400 });
//         } else {
//             const course = await Course.create({
//                 // user_id: req.user.id,
//                 title,
//                 description,
//                 level,
//                 images,
//                 chapters
//             });
//             return NextResponse.json({ course: course, status: 200 });
//         }
//     } catch (error: any) {
//         return NextResponse.json({ err: error.message, status: 400 })
//     }
// }

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        console.log("body",body);


        const result = await createCourse(request, body);
        return NextResponse.json(result, { status: result.status });
    } catch (error: any) {
        return NextResponse.json({ err: error.message, status: 400 });
    }
}
