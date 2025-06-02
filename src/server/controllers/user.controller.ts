import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../constants";


export async function signUp({ name, email, password, isAdmin }: User) {
    try {
        const availUser = await UserModel.findOne({ email });

        if (availUser) {
            throw new Error("Email already exists");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name,
            email,
            password: hashPassword,
            isAdmin,
        });

        const userRole = user.isAdmin ? "admin" : "user";

        
        const token = jwt.sign({ id: user.id, role: userRole }, process.env.ACCESS_TOKEN_SECRET as string, {
            expiresIn: "1h",
        });

        return { token, status: 200 };
    } catch (error) {
        return { error: error, status: 500 };
    }
}


export async function login({ email, password }: User) {
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return { error: "user not found", status: 404 }
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return { error: "Invalid credentials", status: 401 };
        }

        const userRole = user.isAdmin ? "admin" : "user";

        const token = jwt.sign({ id: user.id, role: userRole }, process.env.ACCESS_TOKEN_SECRET as string, {
            expiresIn: "1h",
        });

        return { token, status: 200 };
    } catch (error) {
        return { error: error, status: 500 };
    }
}