'use client'
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';
import Link from 'next/link';

const ContactPage = () => {
    return (
        <Container maxWidth={false}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 8,
                width: '92%',
                borderBottom: '0.5px solid',
                borderBottomColor: "#DCDCDC",
                justifySelf: 'center',
                pb: 8
            }}>
                <Typography sx={{ width: '50%', fontWeight: 'bold', fontSize: 30 }}>Contact Us</Typography>
                <Typography sx={{ width: '50%', color: '#59595A', fontSize: 12 }}>Welcome to SkillBridge's Pricing Plan page, where we offer two comprehensive options to cater to your needs: Free and Pro. We believe in providing flexible and affordable pricing options for our services. Whether you're an individual looking to enhance your skills or a business seeking professional development solutions, we have a plan that suits you. Explore our pricing options below and choose the one that best fits your requirements.</Typography>
            </Box>
            <Box height={"auto"} width={"92%"}
                justifySelf={'center'}
                marginTop={10}
                borderRadius={3}
                display={'flex'}
                bgcolor={'white'}>
                <Box width={"60%"} height={"auto"} sx={{}}>

                    <Box component="form">
                        <Box sx={{ pt: 20, px: 4 }}>
                            <Box justifyContent='space-between' sx={{ display: 'flex' }}>
                                <Box width={"50%"} sx={{ pl: 2, pr: 1 }}>
                                    <Typography sx={{ mb: 1 }}>First Name</Typography>
                                    <TextField
                                        variant="outlined"
                                        placeholder="Enter First Name"
                                        fullWidth
                                        sx={{ backgroundColor: '#FCFCFD' }}
                                    />
                                </Box>
                                <Box width={"50%"} sx={{ pr: 2, pl: 1 }}>
                                    <Typography sx={{ mb: 1 }}>Last Name</Typography>
                                    <TextField
                                        variant="outlined"
                                        placeholder="Enter Last Name"
                                        fullWidth
                                        sx={{ backgroundColor: '#FCFCFD' }}
                                    />
                                </Box>
                            </Box>
                            <Box justifyContent='space-between' sx={{ display: 'flex', mt: 2 }}>
                                <Box width={"50%"} sx={{ pl: 2, pr: 1 }}>
                                    <Typography sx={{ mb: 1 }}>Email</Typography>
                                    <TextField
                                        variant="outlined"
                                        placeholder="Enter your Email"
                                        fullWidth
                                        sx={{ backgroundColor: '#FCFCFD' }}
                                    />
                                </Box>
                                <Box width={"50%"} sx={{ pr: 2, pl: 1 }}>
                                    <Typography sx={{ mb: 1 }}>Phone</Typography>
                                    <TextField
                                        variant="outlined"
                                        type='number'
                                        placeholder="Enter Phone Number"
                                        fullWidth
                                        sx={{ backgroundColor: '#FCFCFD' }}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ pr: 2, pl: 1, mt: 2 }}>
                                <Typography sx={{ mb: 1 }}>Subject</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Enter your Subject"
                                    fullWidth
                                    sx={{ backgroundColor: '#FCFCFD' }}
                                />
                            </Box>
                            <Box sx={{ pr: 2, pl: 1 }}>
                                <Typography sx={{ mb: 1, mt: 2 }}>Message</Typography>
                                <TextField
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    placeholder="Enter your Message here..."
                                    fullWidth
                                    sx={{ backgroundColor: '#FCFCFD' }}
                                />
                            </Box>
                            <Box width={"100%"} marginTop={6} justifyContent={'center'} display={'flex'}>
                                <Button sx={{
                                    px: 3,
                                    py: 1,
                                    borderRadius: 2,
                                    bgcolor: "#FF9500",
                                    color: "white",
                                    alignSelf: 'center'
                                }}>Send Your Message</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box width={"40%"} height={"auto"} sx={{ px: 6, py: 4, borderLeft: '.5px solid', borderLeftColor: '#F2F0EF' }}>
                    <Stack width={"100%"} justifySelf={'center'} sx={{ height: 200, justifyContent: 'center', bgcolor: '#FCFCFD', m: 4 }}>
                        <EmailIcon sx={{ alignSelf: 'center', justifySelf: "center", width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
                        <Typography sx={{ alignSelf: 'center', justifySelf: 'center', pt: 3, fontSize: 18, color: '#4C4C4D' }}>support@skillbridge.com</Typography>
                    </Stack>
                    <Stack width={"100%"} justifySelf={'center'} sx={{ height: 200, justifyContent: 'center', bgcolor: '#FCFCFD', m: 4 }}>
                        <CallIcon sx={{ alignSelf: 'center', justifySelf: "center", width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
                        <Typography sx={{ alignSelf: 'center', justifySelf: 'center', pt: 3, fontSize: 18, color: '#4C4C4D' }}>+91 00000 00000</Typography>
                    </Stack>
                    <Stack width={"100%"} justifySelf={'center'} sx={{ height: 200, justifyContent: 'center', bgcolor: '#FCFCFD', m: 4 }}>
                        <LocationOnIcon sx={{ alignSelf: 'center', justifySelf: "center", width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
                        <Typography sx={{ alignSelf: 'center', justifySelf: 'center', pt: 3, fontSize: 18, color: '#4C4C4D' }}>Some Where in the World</Typography>
                    </Stack>
                    <Stack width={"100%"} justifySelf={'center'} sx={{ height: 200, justifyContent: 'center', bgcolor: '#FCFCFD', m: 4 }}>
                        <Stack direction={'row'} sx={{ justifyContent: 'center' }}>
                            <FacebookOutlinedIcon sx={{ alignSelf: 'center', mr: 2, justifySelf: "center", width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
                            <XIcon sx={{ alignSelf: 'center', mr: 2, justifySelf: "center", width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
                            <LinkedInIcon sx={{ alignSelf: 'center', justifySelf: "center", width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
                        </Stack>
                        <Typography sx={{ alignSelf: 'center', justifySelf: 'center', pt: 3, fontSize: 18, color: '#4C4C4D' }}>Social Profiles</Typography>
                    </Stack>
                </Box>
            </Box>
        </Container >
    )
}

export default ContactPage