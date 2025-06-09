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


export const Achievements = [
    {
        "icon": "/images/aboutPage/crown.svg",
        "title": "Trusted by Thousands",
        "description": "We have successfully served thousands of students, helping them unlock their potential and achieve their career goals."
    },
    {
        "icon": "/images/aboutPage/reward.svg",
        "title": "Award-Winning Courses",
        "description": "Our courses have received recognition and accolades in the industry for their quality, depth of content, and effective teaching methodologies."
    },
    {
        "icon": "/images/aboutPage/mask.svg",
        "title": "Positive Student Feedback",
        "description": "We take pride in the positive feedback we receive from our students, who appreciate the practicality and relevance of our course materials."
    },
    {
        "icon": "/images/aboutPage/shield.svg",
        "title": "Industry Partnerships",
        "description": "We have established strong partnerships with industry leaders, enabling us to provide our students with access to the latest tools and technologies"
    },
]

export const Goals = [
    {
        "icon": "/images/aboutPage/bag.svg",
        "title": "Provide Practical Skills",
        "description": "We focus on delivering practical skills that are relevant to the current industry demands. Our courses are designed to equip learners with the knowledge and tools needed to excel in their chosen field."
    },
    {
        "icon": "/images/aboutPage/book.svg",
        "title": "Foster Creative Problem-Solving",
        "description": "We encourage creative thinking and problem-solving abilities, allowing our students to tackle real-world challenges with confidence and innovation."
    },
    {
        "icon": "/images/aboutPage/puzzle.svg",
        "title": "Promote Collaboration and Community",
        "description": "We believe in the power of collaboration and peer learning. Our platform fosters a supportive and inclusive community where learners can connect, share insights, and grow together."
    },
    {
        "icon": "/images/aboutPage/idea.svg",
        "title": "Stay Ahead of the Curve",
        "description": "The digital landscape is constantly evolving, and we strive to stay at the forefront of industry trends. We regularly update our course content to ensure our students receive the latest knowledge and skills."
    },
]


export const Benefits = [
    {
        id: 1,
        name: 'Flexible Learning Schedule',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim tempora optio illo, sed dolor libero inventore doloremque aliquam',
    },
    {
        id: 2,
        name: 'Expert Instruction',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim tempora optio illo, sed dolor libero inventore doloremque aliquam',
    },
    {
        id: 3,
        name: 'Diverse Course Offerings',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim tempora optio illo, sed dolor libero inventore doloremque aliquam',
    },
    {
        id: 4,
        name: 'Updated Curriculum',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim tempora optio illo, sed dolor libero inventore doloremque aliquam',
    },
    {
        id: 5,
        name: 'Practical Projects and Assignments',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim tempora optio illo, sed dolor libero inventore doloremque aliquam',
    },
    {
        id: 6,
        name: 'Interactive Learning Environment',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim tempora optio illo, sed dolor libero inventore doloremque aliquam',
    },
];


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
