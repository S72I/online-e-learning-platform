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
} from '@mui/material';
import Image from 'next/image';

const pages = ['Home', 'Courses', 'About Us', 'Pricing', 'Contact'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box
        sx={{
          mt: 2,
          mx: 2,
          borderRadius: 2,
          height: 40,
          backgroundColor: '#FF9500',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography sx={{ color: 'white' }}>
            Free Courses 🌟 Sale Ends Soon, Get It Now
          </Typography>
          <IconButton size="small">
            <Image
              src="/images/arrowIcon.png"
              width={20}
              height={20}
              alt="Arrow Icon"
            />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ mt: 2, px: 4 }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Image
            src="/images/Logo.png"
            width={30}
            height={30}
            alt="Skillbridge Logo"
          />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ color: 'black', ml: 2 }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button sx={{ color: 'black' }}>Sign Up</Button>
            <Button sx={{ color: 'black', ml: 1 }}>Login</Button>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <Image
                src="/images/menuIcon.png"
                width={30}
                height={30}
                alt="Menu Icon"
              />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Sign Up</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Login</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </>
  );
}

export default ResponsiveAppBar;
