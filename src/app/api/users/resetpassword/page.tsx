// 'use client';

// import { useSearchParams } from 'next/navigation';
// import { useState } from 'react';
// import { Button, TextField, Typography, Container, Box, Alert } from '@mui/material';

// export default function ResetPassword() {
//     const searchParams = useSearchParams();
//     const token = searchParams.get('token');

//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleReset = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             setMessage("Passwords do not match.");
//             return;
//         }

//         const res = await fetch('/api/users/resetpassword', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ token, password })
//         });

//         const data = await res.json();
//         if (res.ok) {
//             setMessage("Password reset successful. You can now log in.");
//         } else {
//             setMessage(data.error || "Something went wrong.");
//         }
//     };

//     return (
//         <Container maxWidth="sm">
//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
//                 <Typography variant="h4" component="h1" gutterBottom>
//                     Reset Password
//                 </Typography>

//                 <form onSubmit={handleReset} style={{ width: '100%' }}>
//                     <TextField
//                         label="New Password"
//                         type="password"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />

//                     <TextField
//                         label="Confirm Password"
//                         type="password"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         required
//                     />

//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         sx={{ mt: 2 }}
//                     >
//                         Reset Password
//                     </Button>
//                 </form>

//                 {message && (
//                     <Alert sx={{ mt: 2 }} severity={message.startsWith("") ? 'success' : 'error'}>
//                         {message}
//                     </Alert>
//                 )}
//             </Box>
//         </Container>
//     );
// }
