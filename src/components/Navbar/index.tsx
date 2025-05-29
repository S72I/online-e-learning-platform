// 'use client';

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
//   AppBar,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const pages = ['Home', 'Courses', 'AboutUs', 'Pricing', 'Contact'];

// export default function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);
//   const router = useRouter();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const handleLogOut = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("rememberMe");
//     sessionStorage.removeItem("authToken");
//     sessionStorage.removeItem("rememberMe");
//     setIsLoggedIn(false);
//     router.push("/login");
//   };

//   React.useLayoutEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const sessionToken = sessionStorage.getItem('authToken')
//     setIsLoggedIn(!!token || !!sessionToken);
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
//           maxWidth: 1200,
//         }}
//       >
//         <Stack direction="row" alignItems="center" spacing={1}>
//           <Typography
//             sx={{
//               color: 'white',
//               px: 2,
//               fontSize: { xs: 10, sm: 12, md: 13 },
//               textAlign: 'center',
//               fontWeight: 500,
//             }}
//           >
//             Free Courses 🌟 Sale Ends Soon, Get It Now
//           </Typography>
//           <IconButton size="small" sx={{ color: 'white' }}>
//             <Image
//               src="/images/arrowIcon.png"
//               width={20}
//               height={20}
//               alt="Arrow Icon"
//               style={{ filter: 'brightness(0) invert(1)' }}
//             />
//           </IconButton>
//         </Stack>
//       </Box>

//       <AppBar
//         position="static"
//         color="transparent"
//         elevation={0}
//         sx={{
//           mt: 2,
//           px: { xs: 1, sm: 2, md: 3 },
//           maxWidth: 1200,
//           mx: 'auto',
//           width: '95%',
//         }}
//       >
//         <Toolbar
//           disableGutters
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             width: '100%',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Image
//               src="/images/Logo.png"
//               width={30}
//               height={30}
//               alt="Skillbridge Logo"
//               style={{ cursor: 'pointer' }}
//               onClick={() => router.push('/')}
//             />

//             {isLoggedIn && (
//               <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
//                 {pages.map((page) => (
//                   <Link href={`/${page.toLowerCase()}`} key={page} passHref legacyBehavior>
//                     <Button
//                       sx={{
//                         color: 'text.primary',
//                         fontSize: { md: 12, lg: 14 },
//                         textTransform: 'none',
//                         '&:hover': { backgroundColor: 'action.hover' },
//                         px: 2,
//                       }}
//                     >
//                       {page}
//                     </Button>
//                   </Link>
//                 ))}
//               </Box>
//             )}
//           </Box>

//           {isLoggedIn && isMobile && (
//             <IconButton
//               size="large"
//               aria-label="menu"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//               sx={{ display: { md: 'none' } }}
//             >
//               <Image
//                 src="/images/menuIcon.png"
//                 width={28}
//                 height={28}
//                 alt="Menu Icon"
//               />
//             </IconButton>
//           )}

//           <Menu
//             anchorEl={anchorElNav}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//             open={Boolean(anchorElNav)}
//             onClose={handleCloseNavMenu}
//             sx={{ display: { md: 'none' } }}
//           >
//             {pages.map((page) => (
//               <MenuItem
//                 key={page}
//                 onClick={() => {
//                   handleCloseNavMenu();
//                   router.push(`/${page.toLowerCase()}`);
//                 }}
//                 sx={{ minWidth: 150 }}
//               >
//                 <Typography textAlign="center">{page}</Typography>
//               </MenuItem>
//             ))}
//           </Menu>

//           <Box sx={{ display: 'flex', gap: 1 }}>
//             {!isLoggedIn ? (
//               <>
//                 <Button
//                   component={Link}
//                   href="/signup"
//                   variant="outlined"
//                   size="small"
//                   sx={{
//                     color: 'text.primary',
//                     fontSize: { xs: 12, sm: 13 },
//                     textTransform: 'none',
//                     borderColor: 'divider',
//                     '&:hover': { borderColor: 'text.primary' },
//                   }}
//                 >
//                   Sign Up
//                 </Button>
//                 <Button
//                   component={Link}
//                   href="/login"
//                   variant="contained"
//                   size="small"
//                   sx={{
//                     backgroundColor: 'primary.main',
//                     color: 'white',
//                     fontSize: { xs: 12, sm: 13 },
//                     textTransform: 'none',
//                     '&:hover': { backgroundColor: 'primary.dark' },
//                   }}
//                 >
//                   Login
//                 </Button>
//               </>
//             ) : (
//               <Button
//                 onClick={handleLogOut}
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   color: 'text.primary',
//                   fontSize: { xs: 12, sm: 13 },
//                   textTransform: 'none',
//                   borderColor: 'divider',
//                   '&:hover': { borderColor: '#FF9500', color: '#FF9500' },
//                 }}
//               >
//                 Logout
//               </Button>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </>

//   );
// }



'use client';

import * as React from 'react';
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Button,
  MenuItem,
  Stack,
  AppBar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const pages = ['Home', 'Courses', 'AboutUs', 'Pricing', 'Contact'];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Use useEffect for client-only code
  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    const sessionToken = sessionStorage.getItem('authToken');
    setIsLoggedIn(!!token || !!sessionToken);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("rememberMe");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("rememberMe");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      {/* Top Banner */}
      <Box
        sx={{
          mt: 2,
          mx: 'auto',
          borderRadius: 2,
          height: 40,
          backgroundColor: '#FF9500',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '95%',
          maxWidth: 1200,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            sx={{
              color: 'white',
              px: 2,
              fontSize: { xs: 10, sm: 12, md: 13 },
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            Free Courses 🌟 Sale Ends Soon, Get It Now
          </Typography>
          <IconButton size="small" sx={{ color: 'white' }}>
            <Image
              src="/images/arrowIcon.png"
              width={20}
              height={20}
              alt="Arrow Icon"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </IconButton>
        </Stack>
      </Box>

      {/* Main AppBar */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          mt: 2,
          px: { xs: 1, sm: 2, md: 3 },
          maxWidth: 1200,
          mx: 'auto',
          width: '95%',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Logo and Desktop Nav */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Image
              src="/images/Logo.png"
              width={30}
              height={30}
              alt="Skillbridge Logo"
              style={{ cursor: 'pointer' }}
              onClick={() => router.push('/')}
            />

            {isLoggedIn && (
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    component={Link}
                    href={`/${page.toLowerCase()}`}
                    sx={{
                      color: 'text.primary',
                      fontSize: { md: 12, lg: 14 },
                      textTransform: 'none',
                      '&:hover': { backgroundColor: 'action.hover' },
                      px: 2,
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            )}
          </Box>

          {/* Mobile Nav Icon */}
          {isLoggedIn && isMobile && (
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ display: { md: 'none' } }}
            >
              <Image
                src="/images/menuIcon.png"
                width={28}
                height={28}
                alt="Menu Icon"
              />
            </IconButton>
          )}

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { md: 'none' } }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  router.push(`/${page.toLowerCase()}`);
                }}
                sx={{ minWidth: 150 }}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>

          {/* Auth Buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {!isLoggedIn ? (
              <>
                <Button
                  component={Link}
                  href="/signup"
                  variant="outlined"
                  size="small"
                  sx={{
                    color: 'text.primary',
                    fontSize: { xs: 12, sm: 13 },
                    textTransform: 'none',
                    borderColor: 'divider',
                    '&:hover': { borderColor: 'text.primary' },
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  component={Link}
                  href="/login"
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontSize: { xs: 12, sm: 13 },
                    textTransform: 'none',
                    '&:hover': { backgroundColor: 'primary.dark' },
                  }}
                >
                  Login
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogOut}
                variant="outlined"
                size="small"
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: 12, sm: 13 },
                  textTransform: 'none',
                  borderColor: 'divider',
                  '&:hover': { borderColor: '#FF9500', color: '#FF9500' },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

