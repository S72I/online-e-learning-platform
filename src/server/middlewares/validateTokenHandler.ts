import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../interfaces";

interface IJwtPayload extends JwtPayload {
    role: string;
}

const tokenNotProvided = "Unauthorized: No token provided"
const adminAction = "Forbidden: Only admins can perform this action"

export const validateUser = (req: NextRequest) => {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error(tokenNotProvided);
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as IJwtPayload;
    if (decoded.role !== UserRole.admin) {
        throw new Error(adminAction);
    }
    return decoded;
};
