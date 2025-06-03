export interface User {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    emailVerify: boolean,
}

export interface IChapter {
    title: string,
    videos: [
        {
            videoTitle: string,
            description: string,
            videoUri: string,
            videoTiming: string
        }
    ]
}

export interface ICourse {
    user_id: string,
    title: string,
    level: string,
    description: string,
    images: [string],
    chapters: [IChapter],
    totalVideosTiming: string,
    createdAt: Date,
    updatedAt: Date,
    isDeleted: boolean
}


export interface EmailTemplateProps {
    composeEmail: string;
}

export interface EmailBody {
    firstname: string,
    lastname: string,
    email: string,
    phonenumber: string,
    subject: string,
    message: string
}


// // Video input (from client)
// export interface IVideoInput {
//   videoTitle: string;
//   description?: string;
//   videoUri: string;
//   videoTiming: string;
// }

// // Chapter input (from client)
// export interface IChapterInput {
//   title: string;
//   videos: IVideoInput[];
// }

// // Course input (from client)
// export interface ICourseInput {
//   title: string;
//   level: string;
//   description: string;
//   totalVideosTiming: string;
//   images: string[];
//   chapters: IChapterInput[];
// }



import { Types } from "mongoose";

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
}
