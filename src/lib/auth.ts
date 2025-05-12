// import User from "@/backend/models/user.model";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export default async function SignUp({ name, email, password, isAdmin }: any) {

//     const secretKey = process.env.ACCESS_TOKEN_SECRET;
//     let token = "";
//     let userRole: string;
//     try {
//         const availUser = await User.findOne({ email });

//         availUser ? NextResponse.json({ error: "Email already Exist" }, { status: 400 }) : "";

//         const hashPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({
//             name,
//             email,
//             password: hashPassword,
//             isAdmin,
//         });

//         user.isAdmin === true ? userRole = "admin" : userRole = "user"
//         if (user) {
//             token = jwt.sign({ id: user.id, role: userRole }, secretKey as string, { expiresIn: "1h" });
//             return NextResponse.json({ token: token, status: 200 });
//         }
//         console.log(token);

//         return token
//     } catch (error) {

//     }
// }
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/backend/models/user.model";

const secretKey = process.env.ACCESS_TOKEN_SECRET as string;

export async function signUp({ name, email, password, isAdmin }: any) {
    try {
        const availUser = await User.findOne({ email });

        if (availUser) {
            throw new Error("Email already exists");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            isAdmin,
        });

        const userRole = user.isAdmin ? "admin" : "user";

        const token = jwt.sign({ id: user.id, role: userRole }, secretKey, {
            expiresIn: "1h",
        });

        return { token, status: 200 };
    } catch (error: any) {
        return { error: error.message, status: 409 };
    }
}

export async function login({ email, password }: any) {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const userRole = user.isAdmin ? "admin" : "user";

        const token = jwt.sign({ id: user.id, role: userRole }, secretKey, {
            expiresIn: "1h",
        });

        return { token, status: 200 };
    } catch (error: any) {
        return { error: error.message, status: 404 };
    }
}
