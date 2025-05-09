// 'use client';

// import { useRegisterUserMutation } from '@/services/authApi';
// import { Button, Container, Stack, TextField, Typography } from '@mui/material';
// import Link from 'next/link';
// import React from 'react'

// export default function SigninPage() {
//     const [registerUser, { isLoading }] = useRegisterUserMutation();

//     const onSubmit = async (data: any) => {
//         try {
//             const response = await registerUser(data).unwrap();
//             console.log("response", response);
//         } catch (err) {
//             console.log("Registration failed");
//         }
//     };

//     return (
//         <Container component="main" sx={{ mt: 20 }} maxWidth="xs">
//             <Typography variant="h5" align="center" gutterBottom>
//                 Sign Up
//             </Typography>

//             <form >
//                 <Stack spacing={2}>
//                     <TextField
//                         label="Name"
//                         variant="outlined"
//                     />

//                     <TextField
//                         label="Email"
//                         variant="outlined"
//                     />

//                     <TextField
//                         label="Password"
//                         variant="outlined"
//                         type="password"
//                     />
//                     <Button variant="contained" disabled={isLoading} onClick={onSubmit}>
//                         {isLoading ? "Registering..." : "Register"}
//                     </Button>

//                     <Typography variant="body2" align="center">
//                         Already have an account? <Link href={"/login"}>Login</Link>
//                     </Typography>
//                 </Stack>
//             </form>
//         </Container>
//     )
// }

