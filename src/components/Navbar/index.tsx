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
import Link from 'next/link';

const pages = ['Home', 'Courses', 'AboutUs', 'Pricing', 'Contact'];

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
          justifySelf: 'center',
          borderRadius: 2,
          height: 40,
          backgroundColor: '#FF9500',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '98%',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography sx={{ color: 'white', px: { xs: 2 }, fontSize: { xs: 12 } }}>
            Free Courses 🌟 Sale Ends Soon, Get It Now
          </Typography>
          <IconButton size="small">
            <Image src="/images/arrowIcon.png" width={20} height={20} alt="Arrow Icon" />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ mt: 2, px: 2 }}>
        <Toolbar
          disableGutters
          sx={{
            width: '97%',
            justifySelf: 'center',
            overflow: 'hidden',
            display: { sm: 'flex', md: 'flex' },
            justifyContent: { sm: 'space-between', md: 'space-between', xs: 'space-between' },
          }}
        >
          <Image src="/images/Logo.png" width={30} height={30} alt="Skillbridge Logo" />

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: { sm: 20, md: 35, lg: 80, xl: 220 },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  console.log(page);
                  handleCloseNavMenu();
                }}
                sx={{ color: 'black', ml: 2 }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: { xs: '0' } }}>
            <IconButton
              sx={{ ml: { sm: 64, xs: 8 } }}
              size="large"
              aria-label="navigation menu"
              onClick={(e) => handleOpenNavMenu(e)}
              color="inherit"
            >
              <Image src="/images/menuIcon.png" width={30} height={30} alt="Menu Icon" />
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
                <MenuItem
                  key={page}
                  onClick={() => {
                    console.log(page);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ width: 'auto', display: { md: 'flex', xs: 'flex' }, mr: { sm: 0 } }}>
            <Button
              component={Link}
              href="/signup"
              sx={{ color: 'black', fontSize: { md: 12, xs: 11, lg: 12, xl: 12 } }}
            >
              SignUp
            </Button>
            <Button
              component={Link}
              href="/login"
              sx={{ color: 'black', fontSize: { md: 12, xs: 11, lg: 12, xl: 12 } }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </>
  );
}

export default ResponsiveAppBar;
