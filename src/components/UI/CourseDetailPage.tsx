'use client'
import { Box, Grid, Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import { useParams, useRouter } from "next/navigation";
import { useGetCourseQuery } from "@/services/public/publicCourseApi";
import { useAuth } from "@/context/AuthContext";
import { IChapter, IVideo } from "../types/course";
import CustomLoading from "./CustomLoading";

const CourseDetailPage = () => {
    const params = useParams();
    const { data, isLoading, isError } = useGetCourseQuery(params.id);
    const router = useRouter();
    const firstChapter = data?.result?.chapters?.[0];
    const firstVideo = firstChapter?.videos?.[0];

    const { isAuthenticated, sessionStoreCourseId } = useAuth();
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [videoToPlay, setVideoToPlay] = useState('');


    const handleClick = (videoUri: string) => {
        if (isAuthenticated) {
            setVideoToPlay(videoUri);
            setIsVideoModalOpen(true);
        } else {
            sessionStoreCourseId(data?.result?._id);
            router.push("/signup");
        }
    };


    function formatVideoTiming(totalVideosTiming: string): string {

        let totalSeconds: number;

        if (totalVideosTiming.includes(":")) {
            const [minutes, seconds] = totalVideosTiming.split(":").map(Number);
            totalSeconds = minutes * 60 + seconds;
        } else {
            totalSeconds = parseInt(totalVideosTiming) || 0;
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const ss = seconds.toString().padStart(2, '0');
        const mm = minutes.toString().padStart(2, '0');
        const hh = hours.toString().padStart(2, '0');

        if (hours > 0) {
            return `${hh}:${mm} minutes`;
        } else if (minutes > 0) {
            return `${mm}:${ss} seconds`;
        } else {
            return `00:${ss} seconds`;
        }
    }

    return (
        <Box>
            {isLoading ? (
                <Typography sx={{ mt: 5, textAlign: "center" }}>
                    <CustomLoading sx={{ mt: 5, display: 'block', mx: 'auto' }} />

                </Typography>
            ) : isError ? (
                <Typography sx={{ mt: 5, textAlign: "center" }}>
                    Failed to load courses
                </Typography>
            ) : !data?.result ? (
                <Typography sx={{ mt: 5, textAlign: "center" }}>
                    No course available
                </Typography>
            ) : (
                <>
                    <Modal
                        open={isVideoModalOpen}
                        onClose={() => setIsVideoModalOpen(false)}
                        aria-labelledby="video-modal"
                        aria-describedby="video-modal-description"
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '80%',
                                maxWidth: '800px',
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 2,
                                outline: 'none',
                            }}
                        >
                            <video
                                src={videoToPlay}
                                controls
                                autoPlay
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Box>
                    </Modal>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 8,
                            width: "92%",
                            borderBottom: "0.5px solid",
                            borderBottomColor: "#DCDCDC",
                            justifySelf: "center",
                            pb: 8,
                        }}
                    >
                        <Typography sx={{ width: "50%", fontWeight: "bold", fontSize: 30 }}>
                            {data?.result?.title}
                        </Typography>
                        <Typography sx={{ width: "50%", color: "#59595A", fontSize: 12 }}>
                            {data?.result?.description}
                        </Typography>
                    </Box>

                    {firstVideo ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <video
                                width="80%"
                                height="auto"
                                controls
                                style={{
                                    borderRadius: 12,
                                    background: "#000",
                                }}
                            >
                                <source src={firstVideo.videoUri} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </Box>
                    ) : (
                        <Typography textAlign={'center'} fontWeight={'bold'} marginTop={4}>No video available</Typography>
                    )}
                    <Grid
                        container
                        spacing={2}
                        sx={{ mt: 5, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}
                    >
                        {data?.result?.chapters?.map((chapter: IChapter, idx: number) => (
                            <Grid
                                key={idx}
                                size={{ xs: 16, md: 6, sm: 6, lg: 6 }}
                                sx={{
                                    borderRadius: 4,
                                    bgcolor: "white",
                                    height: "auto",
                                    overflow: "hidden",
                                    width: "100%",
                                }}
                            >
                                {firstVideo &&
                                    <Stack
                                        sx={{
                                            border: "0.5px solid",
                                            borderColor: "#F2F0EF",
                                            pb: 5,
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                borderRight: "0.5px solid",
                                                borderRightColor: "#F2F0EF",
                                                py: 1,
                                                px: 4,
                                            }}
                                        >
                                            {<Typography
                                                sx={{
                                                    fontSize: 50,
                                                    fontWeight: "bold",
                                                    fontFamily: "cursive",
                                                    justifySelf: "flex-end",
                                                }}
                                            >
                                                0{idx + 1}
                                            </Typography>}
                                            <Typography sx={{ fontWeight: "bold", color: "#333333" }}>
                                                {chapter.title}
                                            </Typography>
                                        </Box>
                                        {chapter.videos.map((video: IVideo, i: number) => (
                                            <Box
                                                className="chapterBox"
                                                key={i}
                                                sx={{
                                                    width: "92%",
                                                    alignContent: "center",
                                                    margin: "auto",
                                                    height: 100,
                                                    border: "1px solid",
                                                    borderColor: "#F1F1F3",
                                                    mt: 1,
                                                    borderRadius: 2,
                                                    transition:
                                                        "box-shadow 0.2s, border-color 0.2s, background 0.2s",
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        borderColor: "#FF9500",
                                                        boxShadow: "0 4px 16px rgba(255, 149, 0, 0.15)",
                                                        "& .timingBox": {
                                                            bgcolor: "#FF9500",
                                                            color: "white",
                                                            "& svg": { color: "white" },
                                                        },
                                                    },
                                                }}
                                            >
                                                <Box
                                                    onClick={() => handleClick(video.videoUri)}
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                    }}

                                                >
                                                    <Typography
                                                        sx={{

                                                            px: 2,
                                                            width: "70%",
                                                            fontSize: "normal",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {video.videoTitle}
                                                    </Typography>
                                                    <Box
                                                        className="timingBox"
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            bgcolor: "#F7F7F8",
                                                            width: "30%",
                                                            p: 1,
                                                            mr: 4,
                                                            borderRadius: 1,
                                                            fontWeight: 600,
                                                            transition: "background 0.2s, color 0.2s",
                                                        }}
                                                    >
                                                        <WatchLaterOutlinedIcon />
                                                        <Typography sx={{ ml: 1 }}>
                                                            {formatVideoTiming(video.videoTiming)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Typography sx={{ px: 2, color: "#59595A" }}>
                                                    Lesson 0{i + 1}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                }
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default CourseDetailPage;
