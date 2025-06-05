// 'use client'
// import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
// import React from 'react'
// import EmailIcon from '@mui/icons-material/Email';
// import CallIcon from '@mui/icons-material/Call';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
// import XIcon from '@mui/icons-material/X';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import { useCreateContactMutation } from '@/services/public/publicCourseApi';

// const ContactPage = () => {
//     const [contactData, { isLoading, error }] = useCreateContactMutation()
//     return (
//         <Container maxWidth={false}>
//             <Box sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 mt: 8,
//                 width: '92%',
//                 borderBottom: '0.5px solid',
//                 borderBottomColor: "#DCDCDC",
//                 justifySelf: 'center',
//                 pb: 8
//             }}>
//                 <Typography sx={{ width: '50%', fontWeight: 'bold', fontSize: 30 }}>Contact Us</Typography>
//                 <Typography sx={{ width: '50%', color: '#59595A', fontSize: 12 }}>Welcome to SkillBridge's Pricing Plan page, where we offer two comprehensive options to cater to your needs: Free and Pro. We believe in providing flexible and affordable pricing options for our services. Whether you're an individual looking to enhance your skills or a business seeking professional development solutions, we have a plan that suits you. Explore our pricing options below and choose the one that best fits your requirements.</Typography>
//             </Box>
//             <Box height={"auto"} width={"92%"}
//                 justifySelf={'center'}
//                 marginTop={10}
//                 borderRadius={3}
//                 display={'flex'}
//                 bgcolor={'white'}>
//                 <Box width={"60%"} height={"auto"} sx={{}}>

//                     <Box component="form">
//                         <Box sx={{ pt: 20, px: 4 }}>
//                             <Box justifyContent='space-between' sx={{ display: 'flex' }}>
//                                 <Box width={"50%"} sx={{ pl: 2, pr: 1 }}>
//                                     <Typography sx={{ mb: 1 }}>First Name</Typography>
//                                     <TextField
//                                         variant="outlined"
//                                         placeholder="Enter First Name"
//                                         fullWidth
//                                         sx={{ backgroundColor: '#FCFCFD' }}
//                                     />
//                                 </Box>
//                                 <Box width={"50%"} sx={{ pr: 2, pl: 1 }}>
//                                     <Typography sx={{ mb: 1 }}>Last Name</Typography>
//                                     <TextField
//                                         variant="outlined"
//                                         placeholder="Enter Last Name"
//                                         fullWidth
//                                         sx={{ backgroundColor: '#FCFCFD' }}
//                                     />
//                                 </Box>
//                             </Box>
//                             <Box justifyContent='space-between' sx={{ display: 'flex', mt: 2 }}>
//                                 <Box width={"50%"} sx={{ pl: 2, pr: 1 }}>
//                                     <Typography sx={{ mb: 1 }}>Email</Typography>
//                                     <TextField
//                                         variant="outlined"
//                                         placeholder="Enter your Email"
//                                         fullWidth
//                                         sx={{ backgroundColor: '#FCFCFD' }}
//                                     />
//                                 </Box>
//                                 <Box width={"50%"} sx={{ pr: 2, pl: 1 }}>
//                                     <Typography sx={{ mb: 1 }}>Phone</Typography>
//                                     <TextField
//                                         variant="outlined"
//                                         type='number'
//                                         placeholder="Enter Phone Number"
//                                         fullWidth
//                                         sx={{ backgroundColor: '#FCFCFD' }}
//                                     />
//                                 </Box>
//                             </Box>
//                             <Box sx={{ pr: 2, pl: 1, mt: 2 }}>
//                                 <Typography sx={{ mb: 1 }}>Subject</Typography>
//                                 <TextField
//                                     variant="outlined"
//                                     placeholder="Enter your Subject"
//                                     fullWidth
//                                     sx={{ backgroundColor: '#FCFCFD' }}
//                                 />
//                             </Box>
//                             <Box sx={{ pr: 2, pl: 1 }}>
//                                 <Typography sx={{ mb: 1, mt: 2 }}>Message</Typography>
//                                 <TextField
//                                     variant="outlined"
//                                     multiline
//                                     rows={4}
//                                     placeholder="Enter your Message here..."
//                                     fullWidth
//                                     sx={{ backgroundColor: '#FCFCFD' }}
//                                 />
//                             </Box>
//                             <Box width={"100%"} marginTop={6} justifyContent={'center'} display={'flex'}>
//                                 <Button sx={{
//                                     px: 3,
//                                     py: 1,
//                                     borderRadius: 2,
//                                     bgcolor: "#FF9500",
//                                     color: "white",
//                                     alignSelf: 'center'
//                                 }}>Send Your Message</Button>
//                             </Box>
//                         </Box>
//                     </Box>
//                 </Box>
//                 <Box width={"40%"} height={"auto"} sx={{ px: 6, py: 4, borderLeft: '.5px solid', borderLeftColor: '#F2F0EF' }}>
//                     <Stack width={"100%"} justifySelf={'center'} sx={{ height: 200, justifyContent: 'center', bgcolor: '#FCFCFD', m: 4 }}>
//                         <EmailIcon sx={{ alignSelf: 'center', justifySelf: "center", width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
//                         <Typography sx={{ alignSelf: 'center', justifySelf: 'center', pt: 3, fontSize: 18, color: '#4C4C4D' }}>support@skillbridge.com</Typography>
//                     </Stack>
//                     <Stack width={"100%"} justifySelf={'center'} sx={{ height: 200, justifyContent: 'center', bgcolor: '#FCFCFD', m: 4 }}>
//                         <CallIcon sx={{ alignSelf: 'center', justifySelf: "center", width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
//                         <Typography sx={{ alignSelf: 'center', justifySelf: 'center', pt: 3, fontSize: 18, color: '#4C4C4D' }}>+91 00000 00000</Typography>
//                     </Stack>
//                     <Stack width={"100%"} justifySelf={'center'} sx={{ height: 200, justifyContent: 'center', bgcolor: '#FCFCFD', m: 4 }}>
//                         <LocationOnIcon sx={{ alignSelf: 'center', justifySelf: "center", width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
//                         <Typography sx={{ alignSelf: 'center', justifySelf: 'center', pt: 3, fontSize: 18, color: '#4C4C4D' }}>Some Where in the World</Typography>
//                     </Stack>
//                     <Stack width={"100%"} justifySelf={'center'} sx={{ height: 200, justifyContent: 'center', bgcolor: '#FCFCFD', m: 4 }}>
//                         <Stack direction={'row'} sx={{ justifyContent: 'center' }}>
//                             <FacebookOutlinedIcon sx={{ alignSelf: 'center', mr: 2, justifySelf: "center", width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
//                             <XIcon sx={{ alignSelf: 'center', mr: 2, justifySelf: "center", width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
//                             <LinkedInIcon sx={{ alignSelf: 'center', justifySelf: "center", width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
//                         </Stack>
//                         <Typography sx={{ alignSelf: 'center', justifySelf: 'center', pt: 3, fontSize: 18, color: '#4C4C4D' }}>Social Profiles</Typography>
//                     </Stack>
//                 </Box>
//             </Box>
//         </Container >
//     )
// }

// export default ContactPage

'use client'

import {
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import React from 'react'
import EmailIcon from '@mui/icons-material/Email'
import CallIcon from '@mui/icons-material/Call'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { useForm } from 'react-hook-form'
import { useCreateContactMutation } from '@/services/public/publicCourseApi'
import { Contact } from '../types/course'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
    const [createContact, { isLoading, error }] = useCreateContactMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Contact>({
        defaultValues: {
            subject: '',
            firstname: '',
            lastname: '',
            phonenumber: '',
            message: '',
            email: ''
        },
    });

    const onSubmit = async (data: any) => {
        try {
            await createContact(data)
            reset()
            toast.success("Message sent successfully!");
        } catch (err) {
            toast.error("Failed to send message.");
        }
    }

    return (
        <Container maxWidth={false}>
            <ToastContainer />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 8,
                    width: '92%',
                    borderBottom: '0.5px solid',
                    borderBottomColor: '#DCDCDC',
                    justifySelf: 'center',
                    pb: 8
                }}
            >
                <Typography sx={{ width: '50%', fontWeight: 'bold', fontSize: 30 }}>
                    Contact Us
                </Typography>
                <Typography sx={{ width: '50%', color: '#59595A', fontSize: 12 }}>
                    Welcome to SkillBridge's Pricing Plan page, where we offer two
                    comprehensive options to cater to your needs: Free and Pro. We believe
                    in providing flexible and affordable pricing options for our services.
                </Typography>
            </Box>

            <Box
                width={'92%'}
                marginTop={10}
                borderRadius={3}
                display={'flex'}
                bgcolor={'white'}
                margin={"auto"}
            >
                <Box width={'60%'}>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 10, px: 4 }}>
                        <Box sx={{ display: 'flex' }}>
                            <Box width={'50%'} sx={{ pl: 2, pr: 1 }}>
                                <Typography sx={{ mb: 1 }}>First Name</Typography>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter First Name"
                                    {...register('firstname', { required: 'First name is required' })}
                                    error={!!errors.firstname}
                                    helperText={errors.firstname?.message}
                                    sx={{ backgroundColor: '#FCFCFD' }}
                                />
                            </Box>
                            <Box width={'50%'} sx={{ pr: 2, pl: 1 }}>
                                <Typography sx={{ mb: 1 }}>Last Name</Typography>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter Last Name"
                                    {...register('lastname', { required: 'Last name is required' })}
                                    error={!!errors.lastname}
                                    helperText={errors.lastname?.message}
                                    sx={{ backgroundColor: '#FCFCFD' }}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', mt: 2 }}>
                            <Box width={'50%'} sx={{ pl: 2, pr: 1 }}>
                                <Typography sx={{ mb: 1 }}>Email</Typography>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter Email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Enter a valid email address'
                                        }
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    sx={{ backgroundColor: '#FCFCFD' }}
                                />
                            </Box>
                            <Box width={'50%'} sx={{ pr: 2, pl: 1 }}>
                                <Typography sx={{ mb: 1 }}>Phone</Typography>
                                <TextField
                                    type='number'
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter Phone Number"
                                    {...register('phonenumber', {
                                        required: 'Phone is required',
                                        minLength: {
                                            value: 10,
                                            message: 'Phone number must be at least 10 digits'
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: 'Phone number must be at least 10 digits'
                                        }
                                    })}
                                    error={!!errors.phonenumber}
                                    helperText={errors.phonenumber?.message}
                                    sx={{ backgroundColor: '#FCFCFD' }}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ pr: 2, pl: 1, mt: 2 }}>
                            <Typography sx={{ mb: 1 }}>Subject</Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Enter your Subject"
                                {...register('subject', { required: 'Subject is required' })}
                                error={!!errors.subject}
                                helperText={errors.subject?.message}
                                sx={{ backgroundColor: '#FCFCFD' }}
                            />
                        </Box>

                        <Box sx={{ pr: 2, pl: 1, mt: 2 }}>
                            <Typography sx={{ mb: 1 }}>Message</Typography>
                            <TextField
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                placeholder="Enter your message"
                                {...register('message', { required: 'Message is required' })}
                                error={!!errors.message}
                                helperText={errors.message?.message}
                                sx={{ backgroundColor: '#FCFCFD' }}
                            />
                        </Box>

                        <Box mt={6} display="flex" justifyContent="center">
                            <Button
                                type="submit"
                                sx={{
                                    px: 3,
                                    py: 1,
                                    borderRadius: 2,
                                    bgcolor: '#FF9500',
                                    color: 'white'
                                }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send Your Message'}
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Contact Info / Social Box */}
                <Box
                    width={'40%'}
                    sx={{
                        px: 6,
                        py: 4,
                        borderLeft: '.5px solid',
                        borderLeftColor: '#F2F0EF'
                    }}
                >
                    {[{
                        icon: <EmailIcon />,
                        text: 'support@skillbridge.com'
                    }, {
                        icon: <CallIcon />,
                        text: '+91 00000 00000'
                    }, {
                        icon: <LocationOnIcon />,
                        text: 'Some Where in the World'
                    }].map((info, index) => (
                        <Stack key={index} sx={{ bgcolor: '#FCFCFD', m: 4, height: 200, justifyContent: 'center' }}>
                            <Box sx={{
                                alignSelf: 'center',
                                width: 50,
                                height: 50,
                                bgcolor: '#F1F1F3',
                                p: 1.5,
                                borderRadius: 2
                            }}>
                                {info.icon}
                            </Box>
                            <Typography sx={{ pt: 3, fontSize: 18, textAlign: 'center', color: '#4C4C4D' }}>
                                {info.text}
                            </Typography>
                        </Stack>
                    ))}
                    <Stack sx={{ m: 4, height: 200, justifyContent: 'center' }}>
                        <Stack direction="row" justifyContent="center" spacing={2}>
                            <FacebookOutlinedIcon sx={{ width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
                            <TwitterIcon sx={{ width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
                            <LinkedInIcon sx={{ width: 50, height: 50, p: 1.5, borderRadius: 2, bgcolor: '#F1F1F3' }} />
                        </Stack>
                        <Typography sx={{ pt: 3, fontSize: 18, textAlign: 'center', color: '#4C4C4D' }}>
                            Social Profiles
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Container>
    )
}

export default ContactPage
