import User from "@/backend/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export default async function SignUp({ name, email, password, isAdmin }: any) {

    const secretKey = process.env.ACCESS_TOKEN_SECERT;
    let token = "";
    let userRole: string;
    try {
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
            token = jwt.sign({ id: user.id, role: userRole }, secretKey as string, { expiresIn: "1h" });
            return NextResponse.json({ token: token, status: 200 });
        }
        console.log(token);

        return token
    } catch (error) {

    }
}