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
        const userBody = await request.json();
        const { name, email, password, isAdmin } = userBody;

        if (!name || !email || !password || !isAdmin) {
            NextResponse.json({ err: "All fields are mandatory", status: 400 });
        }

        const availUser = await User.findOne({ email });

        availUser ? NextResponse.json({ error: "Email already Exist" }, { status: 400 }) : "";

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            isAdmin,
        });
        user.isAdmin === true ? userRole = "admin" : userRole = "user"
        if (user) {
            const token = jwt.sign({ id: user.id, role: userRole }, secretKey as string, { expiresIn: "1h" });
            return NextResponse.json({ token: token, status: 200 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
