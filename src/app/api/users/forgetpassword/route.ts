// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/user.model";
// import { sendEmail } from "@/helpers/mailer";

// export async function POST(request: NextRequest) {
//     try {

//         const userBody = await request.json();
//         const { email } = userBody;

//         let user = await User.findOne({ email: email });

//         if (user) {
//             await sendEmail({ email, emailType: "Forget Password", userId: user.id });
//         }

//         return NextResponse.json({
//             message: "Please confirm your email verification",
//             data: user || null
//         });
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { sendEmail } from "@/helpers/mailer";
import DBConnection from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
  try {
    await DBConnection(); 

    const { email } = await request.json();
    const user = await User.findOne({ email });

    if (user) {
      try {
        await sendEmail({ email, emailType: "Forget Password", userId: user._id });
      } catch (err) {
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
      }
    }

    return NextResponse.json({
      message: "If the user exists, an email has been sent.",
      data: user || null,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
