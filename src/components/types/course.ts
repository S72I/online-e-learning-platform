import { SxProps, Theme } from '@mui/material';

export interface IVideo {
    videoTitle: string;
    description: string;
    videoUri: string;
    videoTiming: string;
}

export interface IChapter {
    title: string;
    videos: IVideo[];
}

export interface ICourse {
    _id: string;
    title: string;
    level: string;
    description: string;
    images: string[];
    user_name: string;
    totalVideosTiming: string;
    chapters: IChapter[];
    isPrivate: boolean
}

export interface IContact {
    subject: string,
    firstname: string,
    lastname: string,
    phonenumber: string,
    message: string,
    email: string

}

export interface IPurchaseCourse {
    _id: string,
    title: string
}

export interface ILoadingProps {
    sx?: SxProps<Theme>;
    size?: number | string;
    color?: 'primary' | 'secondary' | 'inherit' | 'error' | 'info' | 'success' | 'warning';
}








export const levelOptions = [
    { value: "", label: "No Sort" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advance", label: "Advance" },
];

export const sortOrderOptions = [
    { value: "No Sort", label: "No Sort" },
    { value: "asc", label: "Sort A-Z" },
    { value: "desc", label: "Sort Z-A" },
];
