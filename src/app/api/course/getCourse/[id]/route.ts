import DBConnection from "@/backend/dbConfig/dbConfig";
import Course from "@/backend/models/course.mode";
import { NextRequest, NextResponse } from "next/server";
import { validWebToken } from "@/backend/middlewares/validateTokenHandler"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        DBConnection();
        validWebToken
        const id = params.id;

        const findId = await Course.findById(id);
        if (findId.isDeleted === true) return NextResponse.json({ message: "this data already deleted", status: 400 })
        return NextResponse.json({ findId, status: 200 })

    } catch (error: any) {
        return NextResponse.json({ err: error.message, status: 400 })
    }
}