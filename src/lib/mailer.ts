
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        const domain = process.env.DOMAIN || "http://localhost:3000";
        const link =
            emailType === "Forget Password"
        // ? `${domain}/api/users/resetpassword?token=${userId}`
        // : `${domain}/api/users/verifyemail?token=${userId}`;

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "cefe2e15e16283",
                pass: "46a686198acde5",
            },
        });

        const mailOptions = {
            from: 'demohelper@gmail.com',
            to: email,
            subject: emailType,
            text: `Please click the following link to ${emailType.toLowerCase()}: ${link}`,
            html: `<p>Click <a href="${link}">here</a> to ${emailType.toLowerCase()}.</p>`,
        };

        const info = await transporter.sendMail(mailOptions);
        return userId;
    } catch (error: any) {
        console.error("Email sending error:", error.message);
        throw new Error(error.message);
    }
};
