import { login } from "@/server/controllers/user.controller";
import DBConnection from "@/server/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const emailePasswordMessage = "Both email and password are required";
    try {
        await DBConnection();
        const body = await request.json();
        if (!body.email || !body.password) {
            return NextResponse.json({ error: emailePasswordMessage }, { status: 400 });
        }
        const result = await login(body);
        if (result) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json({ error: result }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}