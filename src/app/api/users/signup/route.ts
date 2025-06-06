import { signUp } from "@/server/controllers/user.controller";
import DBConnection from "@/server/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const fieldsRequire = "All fields (name, email, password, isAdmin) are mandatory";
    try {
        await DBConnection();
        const body = await request.json();
        const { name, email, password } = body;
        if (!name || !email || !password) {
            return NextResponse.json({ error: fieldsRequire }, { status: 400 }
            );
        }
        const result = await signUp(body);
        if (result) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json({ error: result });
        }
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
