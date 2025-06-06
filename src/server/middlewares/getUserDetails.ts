import User from "../models/user.model";

export const getUserDetailsByID = (id: string) => {
    const userNotFound = 'User not found';
    
    try {
        const user = User.findById(id);
        if (!user) {
            return { error: userNotFound, status: 404 };
        }
        return user
    } catch (error) {
        return ({ error: (error as Error).message, status: 500 })
    }
}