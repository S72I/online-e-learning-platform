export interface Video {
    title: string;
    description: string;
    uri: string;
    uriTiming: string;
}

export interface Chapter {
    title: string;
    videoUri: Video[];
}

export interface Course {
    title: string;
    level: string;
    description: string;
    images: string[];
    totalVideosTiming: string;
    chapters: Chapter[];
}
