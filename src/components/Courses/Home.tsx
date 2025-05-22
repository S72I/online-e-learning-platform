'use client'

import React from 'react'
import CustomCard from '../UI/CustomCard'
import TestimonialsCard from '../UI/TestimonialsCard'
import Pricing from '../UI/Pricing'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import SectionHeader from '../UI/SectionHeader'
import BenefitsCards from '../UI/BenefitsCards'
import Image from 'next/image'
import Sponsors from '../UI/Sponsors'
import ElectricBoltSharpIcon from '@mui/icons-material/ElectricBoltSharp';

const HomePage = () => {
    return (
        <main>
            <Container
                maxWidth={false}
                sx={{
                    px: { md: 4, xs: 2, lg: 6, xl: 6 },
                    width: "60%",
                    height: "auto",
                    mb: 10, mt: 7,
                    overflow: 'hidden',
                    justifyContent: 'center',

                }} >

                <Box sx={{
                    borderRadius: 1,
                    width: "90%",
                    height: "auto",
                    py: 1,
                    justifySelf: "center",
                    alignItems: 'center',
                    bgcolor: 'white',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Image src={"/logo.svg"} alt='' width={30} height={30} style={{
                        position: 'absolute',
                        left: 350,
                        top: 170
                    }} />
                    <ElectricBoltSharpIcon sx={{ fontSize: 50, p: 1, mr: 1.5, bgcolor: "#FFF4E5" }} />
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ fontSize: 40, fontFamily: "sans-serif", color: '#FF9500', fontWeight: 'bold' }}>Unlock</Typography>
                        <Typography sx={{ fontSize: 40, ml: 1, fontFamily: "sans-serif", color: '#1A1A1A', fontWeight: 'bold' }}>Your Creative Potential</Typography>
                    </Box>
                </Box>
                <Typography
                    sx={{
                        fontSize: 30,
                        fontWeight: '400',
                        width: "90%",
                        color: "#262626",
                        height: "auto",
                        py: 1,
                        justifySelf: "center",
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>with Online Design and Development Courses.</Typography>
                <Typography
                    sx={{
                        fontSize: 15,
                        fontWeight: '400',
                        width: "90%",
                        color: "#262626",
                        height: "auto",
                        justifySelf: "center",
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>Learn from Industry Experts and Enhance Your Skills.</Typography>
                <Box sx={{
                    marginTop: 6,
                    height: "auto",
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Button sx={{ fontWeight: 'bold', p: 1.5, mr: 1, bgcolor: "#FF9500", color: "white" }}>Explore Courses</Button>
                    <Button sx={{ fontWeight: '700', p: 1.5, bgcolor: "white", color: "black" }}>View Pricing</Button>

                </Box>

            </Container>

            <Sponsors />
            <Grid container spacing={2} sx={{ margin: 'auto', justifyContent: 'center', px: { md: 4, xs: 2, lg: 6, xl: 6 }, }}>
                <Image width={1400} height={500} src={"/images/thumbnails/homeThumbnail.png"} alt='' />
            </Grid>

            <SectionHeader
                title="Benefits"
                description="Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in."
                action={
                    <Typography sx={{ border: "0.2px solid", px: 3, bgcolor: "#FCFCFD", borderColor: "transparent", fontSize: 13, py: 1 }}>
                        View All
                    </Typography>
                }
            />
            <BenefitsCards />
            <SectionHeader
                title="Our Courses"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque molestiae nesciunt ratione consectetur ducimus eum id excepturi saepe, laudantium veniam velit animi rerum, corporis non sit temporibus ea! Esse, pariatur!"
                action={
                    <Typography sx={{ border: "0.2px solid", px: 3, bgcolor: "#FCFCFD", borderColor: "transparent", fontSize: 13, py: 1 }}>
                        View All
                    </Typography>
                }
            />
            <CustomCard />
            <SectionHeader
                title="Our Testimonials"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque molestiae nesciunt ratione consectetur ducimus eum id excepturi saepe, laudantium veniam velit animi rerum, corporis non sit temporibus ea! Esse, pariatur!"
                action={
                    <Typography sx={{ border: "0.2px solid", px: 3, bgcolor: "#FCFCFD", borderColor: "transparent", fontSize: 13, py: 1 }}>
                        View All
                    </Typography>
                }
            />
            <TestimonialsCard />
            <SectionHeader
                title="Our Pricing"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque molestiae nesciunt ratione consectetur ducimus eum id excepturi saepe, laudantium veniam velit animi rerum, corporis non sit temporibus ea! Esse, pariatur!"
                action={
                    <Box sx={{ display: 'flex', p: 0.8, bgcolor: '#FCFCFD' }}>
                        <Typography sx={{ border: "0.2px solid", px: 3, bgcolor: "#FF9500", borderColor: "transparent", fontSize: 13, py: 1 }}>Monthly</Typography>
                        <Typography sx={{ border: "0.2px solid", px: 3, bgcolor: "#FCFCFD", borderColor: "transparent", fontSize: 13, py: 1 }}>Yearly</Typography>
                    </Box>
                }
            />
            <Pricing />
        </main >
    )
}

export default HomePage