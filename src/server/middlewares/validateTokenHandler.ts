import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const validateUser = (req: NextRequest) => {

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    if (decoded.role !== "admin") {
        throw new Error("Forbidden: Only admins can perform this action");
    }

    return decoded;
};