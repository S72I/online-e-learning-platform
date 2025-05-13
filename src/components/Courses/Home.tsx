import React from 'react'
import CustomCard from '../UI/CustomCard'
import TestimonialsCard from '../UI/TestimonialsCard'
import Pricing from '../UI/Pricing'
import { Box, Typography } from '@mui/material'
import SectionHeader from '../UI/SectionHeader'

const HomePage = () => {
    return (
        <main>
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
        </main>
    )
}

export default HomePage