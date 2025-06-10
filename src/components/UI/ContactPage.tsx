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
import { IContact } from '../types/course'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
    const [createContact, { isLoading }] = useCreateContactMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IContact>({
        defaultValues: {
            subject: '',
            firstname: '',
            lastname: '',
            phonenumber: '',
            message: '',
            email: ''
        },
    });

    const onSubmit = async (data: IContact) => {
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
