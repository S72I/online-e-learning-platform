import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const Register = async (name: string, email: string, password: string, isAdmin: boolean) => {
    const userRegister = await prisma.User.create({
        data: {
            name,
            email,
            password,
            isAdmin
        }
    });
    return userRegister
}

export const getUser = async (id: string, email: string) => {
    const user = await prisma.User.findUnique({
        where: {
            OR: [
                { id: id },
                { email: email }
            ]
        }
    });

    return user;
};
