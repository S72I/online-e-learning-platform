import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, IconButton, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EastIcon from '@mui/icons-material/East';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const availableFreePlan = [
    "Access to selected free courses.",
    "Limited course materials and resources.",
    "Basic community support.",
    "No certification upon completion.",
    "Ad-supported platform."
];

const notAvailableFreePlan = [
    "Access to exclusive Pro Plan community forums.",
    "Early access to new courses and updates."
];

const proPlane = [
    "Unlimited access to all courses.",
    "Unlimited course materials and resources.",
    "Priority support from instructors.",
    "Course completion certificates.",
    "Ad-free experience.",
    "Access to exclusive Pro Plan community forums.",
    "Early access to new courses and updates."
];

const QnA = [
    {
        title: "Can I enroll in multiple courses at once?",
        description: 'Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.',
        text: "Enrollment Process for Different Courses"
    },
    {
        title: "What kind of support can I expect from instructors?",
        description: 'Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.',
        text: "Enrollment Process for Different Courses"
    },
    {
        title: "Are the courses self-paced or do they have specific start and end dates?",
        description: 'Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.',
        text: "Enrollment Process for Different Courses"
    },
    {
        title: "Are there any prerequisites for the courses?",
        description: 'Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.',
        text: "Enrollment Process for Different Courses"
    },
    {
        title: "Can I download the course materials for offline access?",
        description: 'Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.',
        text: "Enrollment Process for Different Courses"
    }
];

const Pricing = () => {
    const [expanded, setExpanded] = useState(null);

    const handleChange = (panel: any) => (event: any, isExpanded: any) => {
        setExpanded(isExpanded ? panel : null);
    };

    return (
        <>
            <Grid container spacing={2} sx={{ px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                <Container sx={{ width: "100%", bgcolor: "white", pb: 4, overflow: "hidden", justifyContent: 'space-between', display: 'flex' }}>
                    <Box sx={{ bgcolor: '#FCFCFD', overflow: 'hidden', ml: 4, mt: 7, mr: 1, width: "100%", height: "auto" }}>
                        <Box sx={{ mt: 7 }}>
                            <Typography width={"80%"} sx={{
                                textAlign: "center", alignSelf: 'center',
                                color: "#262626", bgcolor: "#FFEACC", margin: "auto", py: 1, fontSize: 14
                            }}>Free Plan</Typography>
                        </Box>
                        <Box sx={{ height: 100, width: 100, margin: 'auto', textAlign: "center", display: 'flex', alignItems: "center" }}>
                            <Typography sx={{ fontSize: 60, fontWeight: 'bold', fontFamily: '-moz-initial' }}>$0</Typography>
                            <Typography sx={{ mt: 4, color: "#4C4C4D", fontWeight: "700" }}>/month</Typography>
                        </Box>
                        <Box sx={{ height: "auto", justifySelf: "center", mb: 5, mx: 2, width: "90%", bgcolor: "white", pb: 3, fontSize: 13 }}>
                            <Typography sx={{ margin: 'auto', textAlign: 'center', color: "#262626", pt: 2, fontSize: 14, pb: 2 }}>Available Features</Typography>
                            {
                                availableFreePlan.map((plan, index) => (
                                    <Box key={index} sx={{ mt: 1, mx: 4, py: 1, border: "0.2px solid", borderColor: "#dedede" }}>
                                        <CheckIcon sx={{ ml: 1, mr: 1, p: 0.2, bgcolor: "#FFF4E5", width: 18, height: 18, fontSize: 14 }} />{plan}
                                    </Box>
                                ))
                            }
                            {
                                notAvailableFreePlan.map((plan, index) => (
                                    <Box key={index} sx={{ mt: 1, mx: 4, py: 1, border: "0.5px solid", borderColor: "#dedede" }}>
                                        <ClearIcon sx={{ ml: 1, mr: 1, p: 0.2, bgcolor: "#F1F1F3", width: 18, height: 18, fontSize: 14 }} />{plan}
                                    </Box>
                                ))
                            }
                        </Box>
                        <Button fullWidth sx={{ bgcolor: "#FF9500", color: "#FFFFFF" }}>Get Started</Button>
                    </Box>

                    <Box sx={{ bgcolor: '#FCFCFD', overflow: 'hidden', ml: 4, mt: 7, mr: 1, width: "100%", height: "auto" }}>
                        <Box sx={{ mt: 7 }}>
                            <Typography width={"80%"} sx={{
                                textAlign: "center", alignSelf: 'center',
                                color: "#262626", bgcolor: "#FFEACC", margin: "auto", py: 1, fontSize: 14
                            }}>Pro Plan</Typography>
                        </Box>
                        <Box sx={{ height: 100, width: 100, margin: 'auto', textAlign: "center", display: 'flex', alignItems: "center" }}>
                            <Typography sx={{ fontSize: 60, fontWeight: 'bold', fontFamily: '-moz-initial' }}>$79</Typography>
                            <Typography sx={{ mt: 4, color: "#4C4C4D", fontWeight: "700" }}>/month</Typography>
                        </Box>
                        <Box sx={{ height: "auto", justifySelf: "center", mb: 5, mx: 2, width: "90%", bgcolor: "white", pb: 3, fontSize: 13 }}>
                            <Typography sx={{ margin: 'auto', textAlign: 'center', color: "#262626", pt: 2, fontSize: 14, pb: 2 }}>Available Features</Typography>
                            {
                                proPlane.map((plan, index) => (
                                    <Box key={index} sx={{ mt: 1, mx: 4, py: 1, border: "0.2px solid", borderColor: "#dedede" }}>
                                        <CheckIcon sx={{ ml: 1, mr: 1, p: 0.2, bgcolor: "#FFF4E5", width: 18, height: 18, fontSize: 14 }} />{plan}
                                    </Box>
                                ))
                            }
                        </Box>
                        <Button fullWidth sx={{ bgcolor: "#FF9500", color: "#FFFFFF" }}>Get Started</Button>
                    </Box>
                </Container>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 12, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                <Container sx={{
                    pt: 10,
                    width: "100%",
                    height: 500,
                    bgcolor: "white",
                    pb: 4,
                    overflow: "hidden",
                    justifyContent: 'space-between',
                    display: 'flex'
                }}>
                    <Box sx={{ height: 200, width: "30%" }}>
                        <Typography sx={{ px: 4, fontSize: 30, fontFamily: 'revert', fontWeight: '700', wordBreak: 'break-word' }}>
                            Frequently <br /> Asked Questions
                        </Typography>
                        <Typography sx={{
                            px: 4,
                            mt: 2,
                            fontSize: 15,
                            color: '#59595A',
                        }}>
                            Still you have any questions? Contact our Team via support@skillbridge.com
                        </Typography>
                        <Button sx={{
                            mx: 4,
                            color: '#262626', px: 4, mt: 2,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: '#F2F0EF'
                        }}>See All FAQ’s</Button>
                    </Box>
                    <Box sx={{ overflow: 'scroll', height: "auto", width: "65%" }}>
                        {QnA.map((data, index) => (
                            <Accordion
                                key={index}
                                expanded={expanded === `panel${index}`}
                                onChange={handleChange(`panel${index}`)}
                                sx={{ m: 2, boxShadow: 'none', border: '0.5px solid', borderColor: '#F2F0EF' }}
                            >
                                <AccordionSummary
                                    sx={{ px: 4 }}
                                    expandIcon={expanded === `panel${index}` ? (
                                        <RemoveIcon sx={{ borderRadius: 2, bgcolor: '#FFF4E5', p: 0.8, fontSize: 30, color: 'black' }} />
                                    ) : (
                                        <AddIcon sx={{ borderRadius: 2, bgcolor: '#FFF4E5', p: 0.8, fontSize: 30, color: 'black' }} />
                                    )}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                    <Typography component="span">{data.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ py: 2, borderTop: '1px solid', borderTopColor: '#F2F0EF' }}>
                                    {data.description}
                                </AccordionDetails>
                                <Box sx={{
                                    my: 4, px: 4, alignItems: 'center', display: 'flex', justifyContent: 'space-between', justifySelf: 'center',
                                    width: "80%", height: 50, bgcolor: '#F1F1F3'
                                }}>
                                    <Typography sx={{ color: '#333333', fontSize: 14 }}>{data.text}</Typography>
                                    <IconButton>
                                        <EastIcon sx={{ bgcolor: '#FFFFFF', width: 35, height: 35, p: 1, borderRadius: 5 }} />
                                    </IconButton>
                                </Box>
                            </Accordion>
                        ))}
                    </Box>
                </Container>
            </Grid>
        </>
    );
}

export default Pricing;
