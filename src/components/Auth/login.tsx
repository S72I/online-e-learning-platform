// 'use client'

// import {
//     Box,
//     Button,
//     Checkbox,
//     Container,
//     IconButton,
//     InputAdornment,
//     Stack,
//     TextField,
//     Typography
// } from '@mui/material';
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useState } from 'react';
// import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
// import { useRouter } from 'next/navigation';
// import { useLoginUserMutation } from '@/services/authAPI';
// import { useForm } from "react-hook-form";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// function Login() {
//     const [loginUser, { isLoading, error }] = useLoginUserMutation();
//     const [checkerror, setCheckError] = useState("");
//     const [rememberMe, setRememberMe] = useState(false);

//     const router = useRouter();

//     const handleRememberMeChange = (event: any) => {
//         setRememberMe(event.target.checked);
//     };

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm();

//     const onSubmit = async (data: any) => {
//         try {
//             const response = await loginUser(data).unwrap();

//             if (response.status === 404) {
//                 return setCheckError(response.error)
//             }
//             if (rememberMe) {
//                 localStorage.setItem("authToken", response.token);
//                 localStorage.setItem("rememberMe", new Boolean(rememberMe).toString());
//                 router.push("/");
//             } else {
//                 sessionStorage.setItem("rememberMe", new Boolean(rememberMe).toString());
//                 router.push("/");
//             }
//         } catch (err: any) {
//             console.error("Login Failed:", err.data.message);
//         }
//     };

//     const [showPassword, setShowPassword] = useState(false);

//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleMouseDownPassword = (event: any) => {
//         event.preventDefault();
//     };

//     return (
//         <Container
//             maxWidth={false}
//             sx={{
//                 overflow: 'hidden',
//                 display: 'flex',
//                 flexDirection: { xs: 'column-reverse', md: 'row' },
//                 height: 'auto',
//                 padding: 0,
//                 marginTop: { xs: 2, sm: 2, md: 2 },
//             }}
//         >
//             <Container
//                 sx={{
//                     width: { xs: '100%', md: '100%' },
//                     backgroundColor: '#f9f9f9',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     padding: 4,
//                 }}
//             >
//                 <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
//                     Students Testimonials
//                 </Typography>
//                 <Typography
//                     sx={{
//                         color: '#666',
//                         textAlign: 'center',
//                         mb: 4,
//                         maxWidth: 500
//                     }}
//                 >
//                     Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et.
//                 </Typography>

//                 <Box
//                     sx={{
//                         backgroundColor: '#fff',
//                         borderRadius: 2,
//                         boxShadow: 2,
//                         p: 3,
//                         maxWidth: 500,
//                         width: '100%',
//                     }}
//                 >
//                     <Typography sx={{ mb: 2, color: '#333', fontSize: 14 }}>
//                         The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!
//                     </Typography>
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             mt: 2,
//                         }}
//                     >
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <Image
//                                 src="/images/profile.png"
//                                 alt="Sarah L"
//                                 width={40}
//                                 height={40}
//                                 style={{ borderRadius: '50%', marginRight: 10 }}
//                             />
//                             <Typography sx={{ fontWeight: 500 }}>Sarah L</Typography>
//                         </Box>
//                         <Button sx={{ borderRadius: 2, p: 1, backgroundColor: "#F7F7F8", color: 'black', fontSize: 12 }}>
//                             Read Full Story
//                         </Button>
//                     </Box>
//                 </Box>

//                 <Box sx={{ color: "black", fontWeight: "bold", display: 'flex', gap: 1, mt: 2 }}>
//                     <Button sx={{ width: "40px", color: "black", backgroundColor: "#FFFFFF", height: "40px" }}>←</Button>
//                     <Button sx={{ width: "40px", color: "black", backgroundColor: "#FFFFFF", height: "40px" }}>→</Button>
//                 </Box>
//             </Container>

//             <Container
//                 sx={{
//                     width: { xs: '100%', md: '100%' },
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     padding: 4,
//                     height: 'auto',
//                     marginTop: { md: 10 }
//                 }}
//             >
//                 <Box
//                     sx={{
//                         width: '100%',
//                         backgroundColor: 'white',
//                         borderRadius: 2,
//                         padding: 4,
//                         boxShadow: 3,
//                         maxWidth: 400,
//                     }}
//                 >
//                     <Typography
//                         sx={{
//                             fontFamily: 'sans-serif',
//                             fontSize: '32px',
//                             textAlign: 'center',
//                             fontWeight: 600,
//                         }}
//                     >
//                         Login
//                     </Typography>

//                     <Typography
//                         sx={{
//                             pb: 3,
//                             color: '#4C4C4C',
//                             fontSize: '12px',
//                             textAlign: 'center',
//                         }}
//                     >
//                         Welcome back! Please log in to access your account.
//                     </Typography>

//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <Stack spacing={2}>
//                             <Box>
//                                 <Typography sx={{ mb: 1 }}>Email</Typography>
//                                 <TextField
//                                     variant="outlined"
//                                     placeholder="Email"
//                                     fullWidth
//                                     autoComplete="email"
//                                     sx={{ backgroundColor: '#FCFCFD' }}
//                                     {...register("email", {
//                                         required: "Email is required",
//                                         pattern: {
//                                             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                                             message: "Invalid email format",
//                                         },
//                                     })}
//                                     error={!!errors.email}
//                                     helperText={errors.email?.message as string}
//                                 />
//                             </Box>
//                             <Box>
//                                 <Typography sx={{ mb: 1 }}>Password</Typography>
//                                 <TextField
//                                     variant="outlined"
//                                     placeholder="Password"
//                                     type={showPassword ? 'text' : 'password'}
//                                     fullWidth
//                                     InputProps={{
//                                         endAdornment: (
//                                             <InputAdornment position="end">
//                                                 <IconButton
//                                                     aria-label="toggle password visibility"
//                                                     onClick={handleClickShowPassword}
//                                                     onMouseDown={handleMouseDownPassword}
//                                                     edge="end"
//                                                 >
//                                                     {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
//                                                 </IconButton>
//                                             </InputAdornment>
//                                         ),
//                                     }}
//                                     autoComplete="current-password"
//                                     sx={{ backgroundColor: '#FCFCFD' }}
//                                     {...register("password", {
//                                         required: "Password is required",
//                                         minLength: {
//                                             value: 4,
//                                             message: "Password must be at least 4 characters",
//                                         },
//                                     })}
//                                     error={!!errors.password}
//                                     helperText={errors.password?.message as string}
//                                 />
//                             </Box>

//                             {checkerror && (
//                                 <Typography color="error" variant="body2">
//                                     {
//                                         "Email or password not matching try again"}
//                                 </Typography>
//                             )}

//                             <Box
//                                 sx={{
//                                     width: "100%", color: "#4C4C4D",
//                                     fontSize: 12, textAlign: "end"
//                                 }}>
//                                 <Link href={""}>Forgot Password?</Link>
//                             </Box>
//                             <Stack direction={'row'} sx={{ alignItems: 'center' }}>
//                                 <Checkbox
//                                     checked={rememberMe}
//                                     onChange={handleRememberMeChange}
//                                     sx={{ color: "#c9c9c9", borderColor: "transparent" }} />
//                                 <Typography sx={{ fontSize: 13, color: "#4C4C4D", }}>Remember Me</Typography>
//                             </Stack>
//                             <Button
//                                 type="submit"
//                                 disabled={isLoading}
//                                 sx={{ color: 'white', backgroundColor: '#FF9500' }}
//                             >
//                                 {isLoading ? "Logging in..." : "Login"}
//                             </Button>

//                             <Box sx={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 mt: 2,
//                             }}>
//                                 <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: '#c0c0c4' }} />
//                                 <Typography sx={{ mx: 2, color: '#c0c0c4' }}>OR</Typography>
//                                 <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: '#c0c0c4' }} />
//                             </Box>

//                             <Button
//                                 sx={{
//                                     backgroundColor: '#F7F7F8',
//                                     fontSize: 12,
//                                     color: 'black',
//                                     textTransform: 'none',
//                                 }}
//                             >
//                                 <Image
//                                     src="/images/googleIcon.png"
//                                     width={25}
//                                     height={25}
//                                     alt="Google Icon"
//                                     style={{ marginRight: '10px' }}
//                                 />
//                                 Login with Google
//                             </Button>

//                             <Typography variant="body2" align="center" sx={{ mt: 2 }}>
//                                 Don’t have an account?
//                                 <Link
//                                     href="/signup"
//                                     style={{
//                                         textDecoration: 'underline',
//                                         fontSize: '13px',
//                                         marginLeft: '5px',
//                                     }}
//                                 >
//                                     Sign Up
//                                 </Link>
//                                 <ArrowOutwardIcon sx={{ fontSize: 16, verticalAlign: 'middle', ml: 0.5 }} />
//                             </Typography>
//                         </Stack>
//                     </form>
//                 </Box>
//             </Container>
//         </Container >
//     );
// }

// export default Login;


'use client'

import {
    Box,
    Button,
    Checkbox,
    Container,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useRouter } from 'next/navigation';
import { useLoginUserMutation } from '@/services/authAPI';
import { useForm } from "react-hook-form";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const [checkerror, setCheckError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const router = useRouter();

    const handleRememberMeChange = (event: any) => {
        setRememberMe(event.target.checked);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const response = await loginUser(data).unwrap();

            if (response.status === 404) {
                return setCheckError(response.error)
            }
            if (rememberMe) {
                localStorage.setItem("authToken", response.token);
                localStorage.setItem("rememberMe", new Boolean(rememberMe).toString());
                router.push("/");
            } else {
                sessionStorage.setItem("rememberMe", new Boolean(rememberMe).toString());
                router.push("/");
            }
        } catch (err: any) {
            console.error("Login Failed:", err.data.message);
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: { xs: 'column-reverse', md: 'row' },
                height: 'auto',
                padding: 0,
                marginTop: { xs: 2, sm: 2, md: 2 },
            }}
        >
            <Container
                sx={{
                    width: { xs: '100%', md: '100%' },
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

                <Box sx={{ color: "black", fontWeight: "bold", display: 'flex', gap: 1, mt: 2 }}>
                    <Button sx={{ width: "40px", color: "black", backgroundColor: "#FFFFFF", height: "40px" }}>←</Button>
                    <Button sx={{ width: "40px", color: "black", backgroundColor: "#FFFFFF", height: "40px" }}>→</Button>
                </Box>
            </Container>

            <Container
                sx={{
                    width: { xs: '100%', md: '100%' },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4,
                    height: 'auto',
                    marginTop: { md: 10 }
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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <Box>
                                <Typography sx={{ mb: 1 }}>Email</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Email"
                                    fullWidth
                                    autoComplete="email"
                                    sx={{ backgroundColor: '#FCFCFD' }}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message as string}
                                />
                            </Box>
                            <Box>
                                <Typography sx={{ mb: 1 }}>Password</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    autoComplete="current-password"
                                    sx={{ backgroundColor: '#FCFCFD' }}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 4,
                                            message: "Password must be at least 4 characters",
                                        },
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message as string}
                                />
                            </Box>

                            {checkerror && (
                                <Typography color="error" variant="body2">
                                    {
                                        "Email or password not matching try again"}
                                </Typography>
                            )}

                            <Box
                                sx={{
                                    width: "100%", color: "#4C4C4D",
                                    fontSize: 12, textAlign: "end"
                                }}>
                                <Link href={""}>Forgot Password?</Link>
                            </Box>
                            <Stack direction={'row'} sx={{ alignItems: 'center' }}>
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                    sx={{ color: "#c9c9c9", borderColor: "transparent" }} />
                                <Typography sx={{ fontSize: 13, color: "#4C4C4D", }}>Remember Me</Typography>
                            </Stack>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                sx={{ color: 'white', backgroundColor: '#FF9500' }}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>

                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mt: 2,
                            }}>
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
                                    href="/signup"
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
                    </form>
                </Box>
            </Container>
        </Container >
    );
}

export default Login;
