"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import TwitterIcon from '@mui/icons-material/Twitter';


const Contacts = [
  "hello@skillbridge.com",
  "+91 91813 23 2309",
  "Somewhere in the World",
];
const Home = ["Benefits", "Our Courses", "Our Testimonials", "Our FAQ", "Contact"];
const About = ["Company", "Achievements", "Our Goals"];

const Index = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "white",
        mt: 5,
        pt: 5,
        pb: 2,
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        <Box sx={{ width: 220 }}>
          <Box sx={{ mb: 2 }}>
            <Image src="/images/Logo.png" width={30} height={30} alt="Logo" />
          </Box>
          <Box sx={{ fontSize: 3 }}>
            <Typography sx={{ color: "#59595A", fontSize: 13, display: "flex", alignItems: "center", mb: 1 }}>
              <EmailIcon sx={{ mr: 1, fontSize: 16 }} /> {Contacts[0]}
            </Typography>
            <Typography sx={{ color: "#59595A", fontSize: 13, display: "flex", alignItems: "center", mb: 1 }}>
              <LocalPhoneIcon sx={{ mr: 1, fontSize: 16 }} /> {Contacts[1]}
            </Typography>
            <Typography sx={{ color: "#59595A", fontSize: 13, display: "flex", alignItems: "center" }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 16 }} /> {Contacts[2]}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: 200 }}>
          <Typography sx={{ fontWeight: "bold", mb: 2 }}>Home</Typography>
          {Home.map((item) => (
            <Typography key={item} sx={{ color: "#59595A", fontSize: 13, mb: 1 }}>
              {item}
            </Typography>
          ))}
        </Box>

        <Box sx={{ width: 200 }}>
          <Typography sx={{ fontWeight: "bold", mb: 2 }}>About Us</Typography>
          {About.map((item) => (
            <Typography key={item} sx={{ color: "#59595A", fontSize: 13, mb: 1 }}>
              {item}
            </Typography>
          ))}
        </Box>

        <Box sx={{ width: 200 }}>
          <Typography sx={{ fontWeight: "bold", mb: 2 }}>Social Profiles</Typography>
          <Stack direction="row" spacing={2}>
            <FacebookOutlinedIcon sx={{ width: 40, height: 40, p: 1, borderRadius: 2, bgcolor: '#F1F1F3' }} />
            <TwitterIcon sx={{ width: 40, height: 40, p: 1, borderRadius: 2, bgcolor: '#F1F1F3' }} />
            <LinkedInIcon sx={{ width: 40, height: 40, p: 1, borderRadius: 2, bgcolor: '#F1F1F3' }} />
          </Stack>
        </Box>
      </Container>

      <hr style={{ marginTop: 20, borderColor: "#F1F1F3" }} />
      <Typography sx={{ textAlign: "center", color: "#656567", fontSize: 13, mt: 2 }}>
        © 2023 Skillbridge. All rights reserved.
      </Typography>
    </Container>
  );
};

export default Index;
