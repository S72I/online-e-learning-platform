import {
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

function SignUp() {
    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', md: 'row' },
                height: '100vh',
                padding: 0
            }}
        >
            <Container
                sx={{
                    width: { xs: '100%', md: '60%' },
                    backgroundColor: '#f9f9f9',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    Students Testimonials
                </Typography>
                <Typography
                    sx={{
                        color: '#666',
                        textAlign: 'center',
                        mb: 4,
                        maxWidth: 500
                    }}
                >
                    Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et.
                </Typography>

                <Box
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        boxShadow: 2,
                        p: 3,
                        maxWidth: 500,
                        width: '100%',
                    }}
                >
                    <Typography sx={{ mb: 2, color: '#333', fontSize: 14 }}>
                        The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Image
                                src="/images/profile.png"
                                alt="Sarah L"
                                width={40}
                                height={40}
                                style={{ borderRadius: '50%', marginRight: 10 }}
                            />
                            <Typography sx={{ fontWeight: 500 }}>Sarah L</Typography>
                        </Box>
                        <Button sx={{ borderRadius: 2, p: 1, backgroundColor: "#F7F7F8", color: 'black', fontSize: 12 }}>
                            Read Full Story
                        </Button>
                    </Box>
                </Box>

                <Box marginLeft={"350px"} sx={{ color: "black", fontWeight: "bold", display: 'flex', gap: 1, mt: 2 }}>
                    <Button sx={{ width: "40px", backgroundColor: "#FFFFFF", height: "40px" }}>←</Button>
                    <Button sx={{ width: "40px", backgroundColor: "#FFFFFF", height: "40px" }}>→</Button>
                </Box>
            </Container>

            <Container
                sx={{
                    width: { xs: '100%', md: '40%' },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        borderRadius: 2,
                        padding: 4,
                        boxShadow: 3,
                        maxWidth: 400,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'sans-serif',
                            fontSize: '32px',
                            textAlign: 'center',
                            fontWeight: 600,
                        }}
                    >
                        Login
                    </Typography>

                    <Typography
                        sx={{
                            pb: 3,
                            color: '#4C4C4C',
                            fontSize: '12px',
                            textAlign: 'center',
                        }}
                    >
                        Welcome back! Please log in to access your account.
                    </Typography>

                    <Box component="form">
                        <Stack spacing={2}>
                            <Box>
                                <Typography sx={{ mb: 1 }}>Email</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Email"
                                    fullWidth
                                    autoComplete="email"
                                    sx={{ backgroundColor: '#FCFCFD' }}
                                />
                            </Box>
                            <Box>
                                <Typography sx={{ mb: 1 }}>Password</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Password"
                                    type="password"
                                    fullWidth
                                    autoComplete="current-password"
                                    sx={{ backgroundColor: '#FCFCFD' }}
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ backgroundColor: '#FF9500' }}
                            >
                                Login
                            </Button>

                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: '#c0c0c4' }} />
                                <Typography sx={{ mx: 2, color: '#c0c0c4' }}>OR</Typography>
                                <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: '#c0c0c4' }} />
                            </Box>

                            <Button
                                sx={{
                                    backgroundColor: '#F7F7F8',
                                    fontSize: 12,
                                    color: 'black',
                                    textTransform: 'none',
                                }}
                            >
                                <Image
                                    src="/images/googleIcon.png"
                                    width={25}
                                    height={25}
                                    alt="Google Icon"
                                    style={{ marginRight: '10px' }}
                                />
                                Login with Google
                            </Button>

                            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                                Don’t have an account?
                                <Link
                                    href="/register"
                                    style={{
                                        textDecoration: 'underline',
                                        fontSize: '13px',
                                        marginLeft: '5px',
                                    }}
                                >
                                    Sign Up
                                </Link>
                                <ArrowOutwardIcon sx={{ fontSize: 16, verticalAlign: 'middle', ml: 0.5 }} />
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
}

export default SignUp;
