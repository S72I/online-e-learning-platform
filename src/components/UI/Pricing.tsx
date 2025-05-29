'use client'
import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, IconButton, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EastIcon from '@mui/icons-material/East';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import ClearIcon from '@mui/icons-material/Clear';

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
  
            <Grid container spacing={2} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
                <Container
                    maxWidth={false}
                    sx={{
                        width: "100%",
                        bgcolor: "white",
                        pb: 4,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 3,
                        px: { xs: 2, sm: 3 }
                    }}
                >
                    {/* Free Plan Card */}
                    <Box sx={{
                        bgcolor: '#FCFCFD',
                        width: { xs: '100%', md: '50%' },
                        mt: { xs: 4, md: 7 },
                        p: 2,
                        borderRadius: 1,
                        boxShadow: 1
                    }}>
                        <Box sx={{ mt: { xs: 2, md: 4 } }}>
                            <Typography sx={{
                                textAlign: "center",
                                color: "#262626",
                                bgcolor: "#FFEACC",
                                margin: "auto",
                                py: 1,
                                fontSize: 14,
                                width: "80%",
                                borderRadius: 1
                            }}>Free Plan</Typography>
                        </Box>

                        <Box sx={{
                            height: 100,
                            margin: 'auto',
                            textAlign: "center",
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: 'center'
                        }}>
                            <Typography sx={{ fontSize: 60, fontWeight: 'bold' }}>$0</Typography>
                            <Typography sx={{ mt: 4, color: "#4C4C4D", fontWeight: "700" }}>/month</Typography>
                        </Box>

                        <Box sx={{
                            mb: { xs: 3, md: 5 },
                            mx: { xs: 1, md: 2 },
                            bgcolor: "white",
                            pb: 3,
                            fontSize: 13
                        }}>
                            <Typography sx={{
                                textAlign: 'center',
                                color: "#262626",
                                pt: 2,
                                fontSize: 14,
                                pb: 2
                            }}>
                                Available Features
                            </Typography>

                            {availableFreePlan.map((plan, index) => (
                                <Box key={index} sx={{
                                    mt: 1,
                                    mx: { xs: 1, md: 2 },
                                    py: 1,
                                    borderBottom: "1px solid",
                                    borderColor: "#dedede",
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <CheckIcon sx={{
                                        ml: 1,
                                        mr: 1,
                                        p: 0.2,
                                        bgcolor: "#FFF4E5",
                                        width: 18,
                                        height: 18,
                                        fontSize: 14
                                    }} />
                                    <Typography component="span">{plan}</Typography>
                                </Box>
                            ))}

                            {notAvailableFreePlan.map((plan, index) => (
                                <Box key={index} sx={{
                                    mt: 1,
                                    mx: { xs: 1, md: 2 },
                                    py: 1,
                                    borderBottom: "1px solid",
                                    borderColor: "#dedede",
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <ClearIcon sx={{
                                        ml: 1,
                                        mr: 1,
                                        p: 0.2,
                                        bgcolor: "#F1F1F3",
                                        width: 18,
                                        height: 18,
                                        fontSize: 14
                                    }} />
                                    <Typography component="span">{plan}</Typography>
                                </Box>
                            ))}
                        </Box>

                        <Button
                            fullWidth
                            sx={{
                                bgcolor: "#FF9500",
                                color: "#FFFFFF",
                                '&:hover': { bgcolor: "#E68600" }
                            }}
                        >
                            Get Started
                        </Button>
                    </Box>

                    {/* Pro Plan Card */}
                    <Box sx={{
                        bgcolor: '#FCFCFD',
                        width: { xs: '100%', md: '50%' },
                        mt: { xs: 2, md: 7 },
                        p: 2,
                        borderRadius: 1,
                        boxShadow: 1
                    }}>
                        <Box sx={{ mt: { xs: 2, md: 4 } }}>
                            <Typography sx={{
                                textAlign: "center",
                                color: "#262626",
                                bgcolor: "#FFEACC",
                                margin: "auto",
                                py: 1,
                                fontSize: 14,
                                width: "80%",
                                borderRadius: 1
                            }}>Pro Plan</Typography>
                        </Box>

                        <Box sx={{
                            height: 100,
                            margin: 'auto',
                            textAlign: "center",
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: 'center'
                        }}>
                            <Typography sx={{ fontSize: 60, fontWeight: 'bold' }}>$79</Typography>
                            <Typography sx={{ mt: 4, color: "#4C4C4D", fontWeight: "700" }}>/month</Typography>
                        </Box>

                        <Box sx={{
                            mb: { xs: 3, md: 5 },
                            mx: { xs: 1, md: 2 },
                            bgcolor: "white",
                            pb: 3,
                            fontSize: 13
                        }}>
                            <Typography sx={{
                                textAlign: 'center',
                                color: "#262626",
                                pt: 2,
                                fontSize: 14,
                                pb: 2
                            }}>
                                Available Features
                            </Typography>

                            {proPlane.map((plan, index) => (
                                <Box key={index} sx={{
                                    mt: 1,
                                    mx: { xs: 1, md: 2 },
                                    py: 1,
                                    borderBottom: "1px solid",
                                    borderColor: "#dedede",
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <CheckIcon sx={{
                                        ml: 1,
                                        mr: 1,
                                        p: 0.2,
                                        bgcolor: "#FFF4E5",
                                        width: 18,
                                        height: 18,
                                        fontSize: 14
                                    }} />
                                    <Typography component="span">{plan}</Typography>
                                </Box>
                            ))}
                        </Box>

                        <Button
                            fullWidth
                            sx={{
                                bgcolor: "#FF9500",
                                color: "#FFFFFF",
                                '&:hover': { bgcolor: "#E68600" }
                            }}
                        >
                            Get Started
                        </Button>
                    </Box>
                </Container>
            </Grid>

            {/* FAQ Section */}
            <Grid container sx={{
                mt: { xs: 6, md: 12 },
                px: { xs: 2, sm: 3, md: 4, lg: 6 }
            }}>
                <Container
                    maxWidth={false}
                    sx={{
                        pt: { xs: 4, md: 10 },
                        width: "100%",
                        height: { xs: 'auto', md: 500 },
                        bgcolor: "white",
                        pb: 4,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4,
                        px: { xs: 2, sm: 3 }
                    }}
                >
                    <Box sx={{
                        width: { xs: '100%', md: '30%' },
                        textAlign: { xs: 'center', md: 'left' }
                    }}>
                        <Typography sx={{
                            fontSize: { xs: 24, md: 30 },
                            fontWeight: '700',
                            lineHeight: 1.2
                        }}>
                            Frequently <br /> Asked Questions
                        </Typography>

                        <Typography sx={{
                            mt: 2,
                            fontSize: 15,
                            color: '#59595A',
                        }}>
                            Still you have any questions? Contact our Team via support@skillbridge.com
                        </Typography>

                        <Button sx={{
                            mt: 2,
                            color: '#262626',
                            px: 4,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: '#F2F0EF',
                            display: { xs: 'none', md: 'inline-flex' }
                        }}>
                            See All FAQ's
                        </Button>
                    </Box>

                    <Box sx={{
                        width: { xs: '100%', md: '65%' },
                        height: { xs: 'auto', md: 400 },
                        overflowY: 'auto',
                        pr: { md: 2 }
                    }}>
                        {QnA.map((data, index) => (
                            <Accordion
                                key={index}
                                expanded={expanded === `panel${index}`}
                                onChange={handleChange(`panel${index}`)}
                                sx={{
                                    mb: 2,
                                    boxShadow: 'none',
                                    border: '1px solid',
                                    borderColor: '#F2F0EF',
                                    borderRadius: '4px !important'
                                }}
                            >
                                <AccordionSummary
                                    sx={{ px: { xs: 2, md: 4 } }}
                                    expandIcon={expanded === `panel${index}` ? (
                                        <ClearIcon sx={{
                                            borderRadius: 2,
                                            bgcolor: '#FFF4E5',
                                            p: 0.5,
                                            fontSize: { xs: 20, md: 30 },
                                            color: 'black'
                                        }} />
                                    ) : (
                                        <AddIcon sx={{
                                            borderRadius: 2,
                                            bgcolor: '#FFF4E5',
                                            p: 0.5,
                                            fontSize: { xs: 20, md: 30 },
                                            color: 'black'
                                        }} />
                                    )}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                    <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>{data.title}</Typography>
                                </AccordionSummary>

                                <AccordionDetails sx={{
                                    py: 2,
                                    borderTop: '1px solid',
                                    borderTopColor: '#F2F0EF',
                                    px: { xs: 2, md: 4 }
                                }}>
                                    <Typography>{data.description}</Typography>
                                </AccordionDetails>

                                <Box sx={{
                                    my: 2,
                                    px: { xs: 2, md: 4 },
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height: 50,
                                    bgcolor: '#F1F1F3',
                                    mx: 'auto',
                                    width: '90%'
                                }}>
                                    <Typography sx={{ color: '#333333', fontSize: 14 }}>{data.text}</Typography>
                                    <IconButton size="small">
                                        <EastIcon sx={{
                                            bgcolor: '#FFFFFF',
                                            width: { xs: 25, md: 35 },
                                            height: { xs: 25, md: 35 },
                                            p: 0.5,
                                            borderRadius: 5
                                        }} />
                                    </IconButton>
                                </Box>
                            </Accordion>
                        ))}

                        <Button
                            fullWidth
                            sx={{
                                mt: 2,
                                color: '#262626',
                                px: 4,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: '#F2F0EF',
                                display: { xs: 'flex', md: 'none' }
                            }}
                        >
                            See All FAQ's
                        </Button>
                    </Box>
                </Container>
            </Grid>
        </>
    );
}

export default Pricing;
