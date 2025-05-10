import { NextRequest, NextResponse } from "next/server";
import DBConnection from "@/backend/dbConfig/dbConfig";
import User from "@/backend/models/user.model";
import SignUp from "@/lib/auth";




export async function POST(request: NextRequest) {

    try {
        DBConnection();
        const userBody = await request.json();
        const { name, email, password, isAdmin } = userBody;

        if (!name || !email || !password || !isAdmin) {
            return NextResponse.json({ err: "All fields are mandatory", status: 400 });
        }

        let result = await SignUp(userBody);
        console.log(result);
        return NextResponse.json({ result, status: 201 })
        // const availUser = await User.findOne({ email });

        // availUser ? NextResponse.json({ error: "Email already Exist" }, { status: 400 }) : "";

        // const hashPassword = await bcrypt.hash(password, 10);
        // const user = await User.create({
        //     name,
        //     email,
        //     password: hashPassword,
        //     isAdmin,
        // });
        // user.isAdmin === true ? userRole = "admin" : userRole = "user"
        // if (user) {
        //     const token = jwt.sign({ id: user.id, role: userRole }, secretKey as string, { expiresIn: "1h" });
        //     return NextResponse.json({ token: token, status: 200 });
        // }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
