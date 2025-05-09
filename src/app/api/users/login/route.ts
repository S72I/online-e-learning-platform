import { NextRequest, NextResponse } from "next/server";
import DBConnection from "@/backend/dbConfig/dbConfig";
import User from "@/backend/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest) {
    const secretKey = process.env.ACCESS_TOKEN_SECERT;
    let userRole: string;
    try {
        DBConnection();
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ err: "All fields are mandatory", status: 400 });
        }

        const user = await User.findOne({ email });

        user.isAdmin == true ? userRole = "admin" : userRole = "user"

        if (email && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign(
                {
                    user: { id: user.id, role: userRole },
                },
                secretKey as string,
                { expiresIn: "24h" }
            );

            return NextResponse.json({ token: accessToken, status: 200 });
        } else {
            return NextResponse.json({ err: "Email or Password invalid try again", status: 401 });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
