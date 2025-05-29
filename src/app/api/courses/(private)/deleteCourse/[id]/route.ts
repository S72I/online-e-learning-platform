// import { deleteCourseById } from "@/lib/course";
// import { NextRequest, NextResponse } from "next/server";

// // export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

// //     try {
// //         DBConnection()
// //         const id = params.id;
// //         const course = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

// //         if (course) return NextResponse.json({ message: "Course deleted", status: 200 })

// //         if (!course) return NextResponse.json({ message: "Course not found", status: 404 })


// //     } catch (error: any) {
// //         return NextResponse.json({ err: error.message, status: 400 })
// //     }
// // } 


// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         const result = await deleteCourseById(request, params.id);
//         return NextResponse.json(result, { status: result.status });
//     } catch (error: any) {
//         return NextResponse.json({ err: error.message, status: 400 });
//     }
// }


import { deleteCourse } from "@/server/controllers/course.controller";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const result = await deleteCourse(request, id);
        return NextResponse.json(result, { status: result.status });
    } catch (error) {
        return NextResponse.json({ err: error, status: 400 });
    }
}
