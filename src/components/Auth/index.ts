import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { getUser, Register } from "../../../prisma/user";

export default async function SignUp(name: string, email: string, password: string, isAdmin: boolean) {
    const secretKey = process.env.ACCESS_TOKEN_SECERT;
    let userRole: string;

    try {
        if (!name || !email || !password || !isAdmin) {
            NextResponse.json({ err: "All fields are mandatory", status: 400 });
        }

        const availUser = await getUser("", email);

        console.log("availUser", availUser);

        availUser ? NextResponse.json({ error: "Email already Exist" }, { status: 400 }) : "";

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await Register(
            name,
            email,
            password = hashPassword,
            isAdmin,
        );
        user.isAdmin === true ? userRole = "admin" : userRole = "user"
        if (user) {
            const token = jwt.sign({ id: user.id, role: userRole }, secretKey as string, { expiresIn: "1h" });
            return NextResponse.json({ token: token, status: 200 });
        }
    } catch (error: any) {

    }

}