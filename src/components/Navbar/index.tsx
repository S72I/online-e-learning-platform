'use client';

import { useRouter } from 'next/navigation';
// import * as React from 'react';
// import {
//   Box,
//   Toolbar,
//   IconButton,
//   Typography,
//   Menu,
//   Button,
//   MenuItem,
//   Stack,
// } from '@mui/material';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const pages = ['Home', 'Courses', 'AboutUs', 'Pricing', 'Contact'];

// export default function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);
//   const router = useRouter();


//   const handelLogOut = () => {
//     localStorage.removeItem("authToken")
//     localStorage.removeItem("rememberMe")
//     router.push("/login");
//     router.refresh();
//   }

//   React.useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     setIsLoggedIn(!!token);
//     router.refresh()
//   }, []);

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           mt: 2,
//           mx: 'auto',
//           borderRadius: 2,
//           height: 40,
//           backgroundColor: '#FF9500',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           width: '95%',
//         }}
//       >
//         <Stack direction="row" alignItems="center" spacing={1}>
//           <Typography
//             sx={{
//               color: 'white',
//               px: 2,
//               fontSize: { xs: 10, sm: 12, md: 13 },
//               textAlign: 'center',
//             }}
//           >
//             Free Courses 🌟 Sale Ends Soon, Get It Now
//           </Typography>
//           <IconButton size="small">
//             <Image src="/images/arrowIcon.png" width={20} height={20} alt="Arrow Icon" />
//           </IconButton>
//         </Stack>
//       </Box>

//       <Box sx={{ mt: 2, px: { xs: 1, sm: 2, md: 3 } }}>
//         <Toolbar
//           disableGutters
//           sx={{
//             width: '100%',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexWrap: 'wrap',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Image src="/images/Logo.png" width={30} height={30} alt="Skillbridge Logo" />

//             {isLoggedIn && (
//               <Box
//                 sx={{
//                   display: { xs: 'none', md: 'flex' },
//                   gap: 2,
//                   alignItems: 'center',
//                 }}
//               >
//                 {pages.map((page) => (
//                   <Link href={`/${page.toLowerCase()}`} key={page} passHref>
//                     <Button className='active'
//                       onClick={handleCloseNavMenu}
//                       sx={{
//                         color: 'black',
//                         fontSize: { md: 12, lg: 13, xl: 14 },
//                         textTransform: 'none',
//                       }}
//                     >
//                       {page}
//                     </Button>
//                   </Link>

//                 ))}
//               </Box>
//             )}
//           </Box>

//           {isLoggedIn && (
//             <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//               <IconButton
//                 aria-label="menu"
//                 onClick={handleOpenNavMenu}
//                 color="inherit"
//               >
//                 <Image src="/images/menuIcon.png" width={28} height={28} alt="Menu Icon" />
//               </IconButton>

//               <Menu
//                 anchorEl={anchorElNav}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                 transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//                 open={Boolean(anchorElNav)}
//                 onClose={handleCloseNavMenu}
//               >
//                 {pages.map((page) => (
//                   <MenuItem key={page} onClick={handleCloseNavMenu}>
//                     <Typography textAlign="center">{page}</Typography>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>
//           )}


//           {!isLoggedIn ? (
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button
//                 component={Link}
//                 href="/signup"
//                 sx={{
//                   color: 'black',
//                   fontSize: { xs: 10, sm: 11, md: 12 },
//                   textTransform: 'none',
//                 }}
//               >
//                 SignUp
//               </Button>
//               <Button
//                 component={Link}
//                 href="/login"
//                 sx={{
//                   color: 'black',
//                   fontSize: { xs: 10, sm: 11, md: 12 },
//                   textTransform: 'none',
//                 }}
//               >
//                 Login
//               </Button>
//             </Box>
//           ) : (<Button
//             onClick={handelLogOut}
//             sx={{
//               color: 'black',
//               fontSize: { xs: 10, sm: 11, md: 12 },
//               textTransform: 'none',
//             }}
//           >
//             Logout
//           </Button>)}
//         </Toolbar>
//       </Box>
//     </>
//   );
// }



import React, { useEffect, useState } from 'react'
import AdminIndex from './adminIndex';
import UserIndex from './userIndex';

const ResponsiveAppBar = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      router.push('/login')
      return
    }

    try {
      const base64Payload = token.split('.')[1]
      const decodedPayload = JSON.parse(atob(base64Payload))
      const userRole = decodedPayload.role

      setRole(userRole)
    } catch (error) {
      console.error('Error decoding token:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (role === 'admin') {
    return <AdminIndex />
  }

  if (role === 'user') {
    return <UserIndex />
  }

  return <div>Unauthorized</div>
}


export default ResponsiveAppBar