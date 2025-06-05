export interface Video {
    videoTitle: string;
    description: string;
    videoUri: string;
    videoTiming: string;
}

export interface Chapter {
    title: string;
    videos: Video[];
}

export interface Course {
    title: string;
    level: string;
    description: string;
    images: string[];
    totalVideosTiming: string;
    chapters: Chapter[];
}

export interface Contact {
    subject: string,
    firstname: string,
    lastname: string,
    phonenumber: string,
    message: string,
    email: string

}
