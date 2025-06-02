export interface User {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    emailVerify: boolean,
}

interface Chapter {
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

export interface Course {
    user_id: string,
    title: string,
    level: string,
    description: string,
    images: [string],
    chapters: [Chapter],
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

