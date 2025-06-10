'use client'
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useRegisterUserMutation } from '@/services/authAPI';
import { Controller, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '@/context/AuthContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    privacyPolicy: boolean;
}

function SignUp() {
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const router = useRouter();
    const { login, sessionCourseId } = useAuth();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        clearErrors,
        reset,
        setError,
    } = useForm<SignUpFormData>();


    const [apiError, setApiError] = useState<string>("");

    const onSubmit = async (data: SignUpFormData) => {
        setApiError("");
        try {
            if (!data.privacyPolicy) {
                setError("privacyPolicy", { type: "manual", message: "You must agree the terms and Privacy Policy" });
                return;
            }

            // const isAdmin = data.role === "admin";
            // const payload = {
            //     ...data,
            //     isAdmin,
            // };
            // delete (payload as any).role;
            // delete (payload as any).privacyPolicy;
            
            const { role, privacyPolicy, ...payload } = data;
            const finalPayload = {
                ...payload,
                isAdmin: role === "admin",
            };

            const response = await registerUser(finalPayload).unwrap();
            if (response.status === 403 && response.error?.toLowerCase().includes("email")) {
                setError("email", { type: "manual", message: response.error });
                return;
            }
            if (response.status === 403) {
                setApiError(response.error);
                return;
            }

            reset();
            localStorage.setItem("authToken", response.token);
            login(response.token);
            toast.success("signup successed!", { autoClose: 1000 });
            clearErrors();
            router.push("/");

        } catch (err: unknown) {
            setApiError("Registration failed. Please try again.");
            toast.error('siup failed!', { autoClose: 1000 });
            console.error(err)
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <ToastContainer />
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
                        <Button sx={{ color: "black", width: "40px", backgroundColor: "#FFFFFF", height: "40px" }}>←</Button>
                        <Button sx={{ color: "black", width: "40px", backgroundColor: "#FFFFFF", height: "40px" }}>→</Button>
                    </Box>
                </Container>

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
                    {/* ... Testimonials Section (unchanged) ... */}

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
                                Sign Up
                            </Typography>

                            <Typography
                                sx={{
                                    pb: 3,
                                    color: '#4C4C4C',
                                    fontSize: '12px',
                                    textAlign: 'center',
                                }}
                            >
                                Create an account to unlock exclusive features.
                            </Typography>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography sx={{ mb: 1, color: "#262626" }}>Full Name</Typography>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Enter your Name"
                                            fullWidth
                                            autoComplete="name"
                                            sx={{ backgroundColor: '#FCFCFD' }}
                                            {...register("name", { required: "Name is required" })}
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ mb: 1, color: "#262626" }}>Email</Typography>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Enter your Email"
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
                                            helperText={errors.email?.message}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ mb: 1, color: "#262626" }}>Password</Typography>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Enter your Password"
                                            type={showPassword ? 'text' : 'password'}
                                            fullWidth
                                            autoComplete="current-password"
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
                                            sx={{ backgroundColor: '#FCFCFD' }}
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters",
                                                },
                                            })}
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ mb: 1, color: "#262626" }}>Select Role</Typography>
                                        <Controller
                                            name="role"
                                            control={control}
                                            rules={{ required: "Role selection is required" }}
                                            defaultValue="user"
                                            render={({ field }) => (
                                                <RadioGroup row {...field}>
                                                    <FormControlLabel value="user" control={<Radio />} label="User" />
                                                    <FormControlLabel disabled={!!sessionCourseId} value="admin" control={<Radio />} label="Admin" />
                                                </RadioGroup>
                                            )}
                                        />
                                        {errors.role && (
                                            <Typography color="error" variant="body2">
                                                {errors.role.message}
                                            </Typography>
                                        )}
                                    </Box>
                                    {/* ---- Privacy Policy Checkbox with error below ---- */}
                                    <Box>
                                        <Stack direction={'row'} sx={{ alignItems: 'center' }}>
                                            <Checkbox
                                                {...register("privacyPolicy", { required: "You must agree the terms and Privacy Policy" })}
                                            />
                                            <Typography sx={{ fontSize: 13 }}>
                                                I agree with <Link style={{ textDecoration: 'underline' }} href={""}>Terms of Use</Link> and <Link style={{ textDecoration: 'underline' }} href={""}>Privacy Policy</Link>
                                            </Typography>
                                        </Stack>
                                        {errors.privacyPolicy && (
                                            <Typography color="error" variant="body2" sx={{ ml: 4 }}>
                                                {errors.privacyPolicy.message}
                                            </Typography>
                                        )}
                                    </Box>
                                    {apiError && (
                                        <Typography color="error" variant="body2">
                                            {apiError}
                                        </Typography>
                                    )}
                                    <Button
                                        type="submit"
                                        sx={{ color: 'white', backgroundColor: '#FF9500' }}
                                        variant="contained"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "SignUp..." : "SignUp"}
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
                                        Already have an account?
                                        <Link
                                            href="/login"
                                            style={{
                                                textDecoration: 'underline',
                                                fontSize: '13px',
                                                marginLeft: '5px',
                                            }}
                                        >
                                            Login
                                        </Link>
                                        <ArrowOutwardIcon sx={{ fontSize: 16, verticalAlign: 'middle', ml: 0.5 }} />
                                    </Typography>
                                </Stack>
                            </form>
                        </Box>
                    </Container>
                </Container>

            </Container>
        </>
    );
}

export default SignUp;
