'use client'

import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import NorthEastIcon from '@mui/icons-material/NorthEast';

const benefits = [
    {
        id: 1,
        name: 'Flexible Learning Schedule',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim tempora optio illo, sed dolor libero inventore doloremque aliquam',
    },
    {
        id: 2,
        name: 'Expert Instruction',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim tempora optio illo, sed dolor libero inventore doloremque aliquam',
    },
    {
        id: 3,
        name: 'Diverse Course Offerings',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim tempora optio illo, sed dolor libero inventore doloremque aliquam',
    },
    {
        id: 4,
        name: 'Updated Curriculum',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim tempora optio illo, sed dolor libero inventore doloremque aliquam',
    },
    {
        id: 5,
        name: 'Practical Projects and Assignments',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim tempora optio illo, sed dolor libero inventore doloremque aliquam',
    },
    {
        id: 6,
        name: 'Interactive Learning Environment',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim tempora optio illo, sed dolor libero inventore doloremque aliquam',
    },
];


const BenefitsCards = () => {
    return (
        <Grid container spacing={2} sx={{ px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
            {
                benefits.map((data, index) => (
                    <Box key={index} sx={{ width: 430, height: 'auto', bgcolor: 'white' }}>
                        <Box
                            justifyContent={"flex-end"}
                            alignItems={"center"}
                            display={"flex"}
                            width={"100%"}
                            height={100}>
                            <Typography sx={{
                                fontSize: 50,
                                fontFamily: "-moz-initial",
                                pr: 3,
                                fontWeight: '800'
                            }}>0{data.id}</Typography>
                        </Box>
                        <Box
                            px={4}
                            width={"100%"}
                            height={"auto"}
                            marginTop={3}
                        >
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {data.name}
                            </Typography>
                            <Typography fontSize={12} color='#4C4C4D'>
                                {data.text}
                            </Typography>

                        </Box>
                        <Box
                            marginTop={5}
                            width={"100%"}
                            marginBottom={5}
                            justifyContent={"flex-end"}
                            alignItems={"center"}
                            display={"flex"}
                            pr={3}
                        >
                            <NorthEastIcon sx={{
                                borderRadius: 2,
                                color: 'orange',
                                width: 35,
                                p: 1,
                                height: 35,
                                bgcolor: "#F1F1F3"
                            }} />
                        </Box>
                    </Box>
                ))
            }
        </Grid>
    )
}

export default BenefitsCards