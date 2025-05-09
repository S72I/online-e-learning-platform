import { NextRequest, NextResponse } from "next/server";
import SignUp from "@/components/Auth";


export default async function handler(request: NextRequest) {

    debugger
    try {
        switch (request.method) {
            case 'POST': {
                const { name, email, password, isAdmin } = await request.json();
                await SignUp(name, email, password, isAdmin);
            }
                break;

            default:
                break;
        }

    } catch (error: any) {
        return NextResponse.json({ err: error.message, status: 400 });
    }
}