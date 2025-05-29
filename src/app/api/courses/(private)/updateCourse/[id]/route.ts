// import { updateCourseById } from "@/lib/course";
// import { NextRequest, NextResponse } from "next/server";

// // export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
// //     try {
// //         DBConnection();

// //         const id = params.id;

// //         const findId = await Course.findById(id);

// //         if (findId.isDeleted === true) return NextResponse.json({ message: "this data already deleted", status: 400 })

// //         const courseData = await request.json()

// //         const updatedCourse = await Course.findByIdAndUpdate(findId, courseData, { new: true });

// //         if (updatedCourse) return NextResponse.json({ message: "course updated", status: 200 })
// //         if (!updatedCourse) return NextResponse.json({ message: "course not found", status: 404 })

// //     } catch (error: any) {
// //         return NextResponse.json({ err: error.message, status: 400 })
// //     }
// // }

// export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         const courseData = await request.json();
//         const id = params.id;

//         const result = await updateCourseById(request, id, courseData);

//         return NextResponse.json(result, { status: 200 });
//     } catch (error: any) {
//         return NextResponse.json({ err: error.message, status: 400 });
//     }
// }


import { updateCourse } from "@/server/controllers/course.controller";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const courseData = await request.json();

        const result = await updateCourse(request, id, courseData);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ err: (error as Error).message, status: 400 });
    }
}
