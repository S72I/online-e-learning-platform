import { Types } from "mongoose"

export interface User {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    emailVerify: boolean,
}

export interface IEmailBody {
    firstname: string,
    lastname: string,
    email: string,
    phonenumber: string,
    subject: string,
    message: string
}

export interface IVideoInput {
    _id?: Types.ObjectId | string;
    videoTitle: string;
    description?: string;
    videoUri: string;
    videoTiming: string;
}

export interface IChapterInput {
    _id?: Types.ObjectId | string;
    title: string;
    videos: IVideoInput[];
}

export interface ICourseInput {
    title: string;
    level: string;
    description: string;
    totalVideosTiming: string;
    images: string[];
    chapters: IChapterInput[];
    isPrivate: Boolean
}

export interface IPurchasedCourse {
    courseId: string,
    userId: string
}

export const UserRole = {
    admin: 'admin',
    user: 'user'
}