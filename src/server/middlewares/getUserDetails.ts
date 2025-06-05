import { NextRequest } from "next/server";
import User from "../models/user.model";

export const getUserDetailsByID = (id: string) => {
    try {
        const user = User.findById(id);
        if (!user) {
            return { error: 'User not found', status: 404 };
        }
        return user
    } catch (error) {
        return ({ error: (error as Error).message, status: 500 })
    }
}