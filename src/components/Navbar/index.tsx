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
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const PROMO_BANNER_TEXT = 'Free Courses 🌟 Sale Ends Soon, Get It Now';

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, logout, role, isLoading } = useAuth();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    router.push('/login');
    router.refresh()
    logout();
  };

  const handleNavigate = (path: string) => {
    handleCloseNavMenu();
    router.push(path);
  };

  interface NavItem {
    label: string;
    path: string;
  }

  const COMMON_ITEMS: NavItem[] = [
    { label: 'About Us', path: '/aboutus' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ];

  const NAV_ITEMS: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Marketplace Courses', path: '/courses' },
    ...COMMON_ITEMS,
  ];

  const USER_NAV_ITEMS: NavItem[] = [
    { label: 'Marketplace Courses', path: '/' },
    { label: 'MyCourses', path: '/courses' },
    ...COMMON_ITEMS,
  ];

  const ADMIN_NAV_ITEMS: NavItem[] = [
    { label: 'MyCourses', path: '/' },
    ...COMMON_ITEMS,
  ];

  let NavItemsArray: NavItem[] = [];

  if (isAuthenticated && role === 'admin') {
    NavItemsArray = ADMIN_NAV_ITEMS;
  } else if (isAuthenticated && role === 'user') {
    NavItemsArray = USER_NAV_ITEMS;
  } else {
    NavItemsArray = NAV_ITEMS;
  }

  if (isLoading) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
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
            {PROMO_BANNER_TEXT}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => router.replace('/')} sx={{ p: 0 }}>
              <Image
                src="/images/Logo.png"
                width={30}
                height={30}
                alt="Skillbridge Logo"
                priority
              />
            </IconButton>

            {/* Desktop Nav Items */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {NavItemsArray.map((item: NavItem) => (
                <Button

                  key={item.path}
                  component={Link}
                  href={item.path}
                  sx={{
                    color: isActive(item.path) ? '#FF9500' : 'text.primary',
                    fontSize: { md: 12, lg: 14 },
                    textTransform: 'none',
                    '&:hover': { backgroundColor: 'action.hover' },
                    '&:active': { backgroundColor: 'action.hover' },
                    px: 2,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Mobile menu */}
          {isMobile && (
            <>
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
              <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { md: 'none' } }}
              >
                {NavItemsArray.map((item: NavItem) => (
                  <MenuItem
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    sx={{ minWidth: 150 }}
                  >
                    <Typography textAlign="center">{item.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          {/* Auth Buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {!isAuthenticated ? (
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
                    '&:hover': {
                      backgroundColor: '#FF9500', color: 'white',
                    }
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
                    backgroundColor: '#FF9500',
                    color: 'white',
                    fontSize: { xs: 12, sm: 13 },
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#FFD580', color: 'black' },
                  }}
                >
                  Login
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogout}
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
