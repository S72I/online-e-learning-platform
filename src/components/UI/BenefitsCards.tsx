'use client'

import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { Benefits } from '@/components/Types/course';

const BenefitsCards = () => {
    return (
        <Grid container spacing={2} sx={{ px: { xs: 2, sm: 2, lg: 6, xl: 1 }, justifyContent: 'center' }}>
            {
                Benefits.map((data, index) => (
                    <Grid key={index} sx={{ borderRadius: 2, width: { md: 430, xs: 430, lg: 430, xl: "40%", sm: 330 }, height: 'auto', bgcolor: 'white' }}>
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
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default BenefitsCards