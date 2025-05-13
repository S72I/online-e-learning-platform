import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const availableFreePlan = ["Access to selected free courses.",
    "Limited course materials and resources.",
    "Basic community support.",
    "No certification upon completion.", "Ad-supported platform."]
const notAvailableFreePlan = ["Access to exclusive Pro Plan community forums.", "Early access to new courses and updates."]

const proPlane = ["Unlimited access to all courses.",
    "Unlimited course materials and resources.",
    "Priority support from instructors.",
    "Course completion certificates.",
    "Ad-free experience.",
    "Access to exclusive Pro Plan community forums.",
    "Early access to new courses and updates."
]
const Pricing = () => {
    return (
        <Grid container spacing={2} sx={{ px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
            <Container sx={{ width: "90%", bgcolor: "white", pb: 4, overflow: "hidden", justifyContent: 'space-between', display: 'flex' }}>
                <Box sx={{ bgcolor: '#FCFCFD', overflow: 'hidden', ml: 4, mt: 7, mr: 1, width: "100%", height: "auto", }}>
                    <Box sx={{ mt: 7 }}>
                        <Typography width={"80%"} sx={{
                            textAlign: "center", alignSelf: 'center',
                            color: "#262626", bgcolor: "#FFEACC", margin: "auto", py: 1, fontSize: 14
                        }}>Free Plan</Typography>
                    </Box>
                    <Box sx={{ height: 100, width: 100, margin: 'auto', textAlign: "center", display: 'flex', alignItems: "center" }}>
                        <Typography sx={{ fontSize: 60, fontWeight: 'bold', fontFamily: '-moz-initial' }}>$0</Typography>
                        <Typography sx={{ mt: 4, color: "#4C4C4D", fontWeight: "700" }}>/month</Typography>
                    </Box>
                    <Box sx={{ height: "auto", justifySelf: "center", mb: 5, mx: 2, width: "90%", bgcolor: "white", pb: 3, fontSize: 13 }}>
                        <Typography sx={{ margin: 'auto', textAlign: 'center', color: "#262626", pt: 2, fontSize: 14, pb: 2 }}>Available Features</Typography>
                        {
                            availableFreePlan.map((plan, index) => (
                                <Box key={index} sx={{ mt: 1, mx: 4, py: 1, border: "0.2px solid", borderColor: "#dedede" }}><CheckIcon sx={{ ml: 1, mr: 1, p: 0.2, bgcolor: "#FFF4E5", width: 18, height: 18, fontSize: 14 }} />{plan}</Box>
                            ))
                        }
                        {
                            notAvailableFreePlan.map((plan, index) => (
                                <Box key={index} sx={{ mt: 1, mx: 4, py: 1, border: "0.5px solid", borderColor: "#dedede" }}><ClearIcon sx={{ ml: 1, mr: 1, p: 0.2, bgcolor: "#F1F1F3", width: 18, height: 18, fontSize: 14 }} />{plan}</Box>
                            ))
                        }
                    </Box>
                    <Button fullWidth sx={{ bgcolor: "#FF9500", color: "#FFFFFF" }}>Get Started</Button>
                </Box>
                <Box sx={{ bgcolor: '#FCFCFD', overflow: 'hidden', ml: 4, mt: 7, mr: 1, width: "100%", height: "auto", }}>
                    <Box sx={{ mt: 7 }}>
                        <Typography width={"80%"} sx={{
                            textAlign: "center", alignSelf: 'center',
                            color: "#262626", bgcolor: "#FFEACC", margin: "auto", py: 1, fontSize: 14
                        }}>Pro Plan</Typography>
                    </Box>
                    <Box sx={{ height: 100, width: 100, margin: 'auto', textAlign: "center", display: 'flex', alignItems: "center" }}>
                        <Typography sx={{ fontSize: 60, fontWeight: 'bold', fontFamily: '-moz-initial' }}>$79</Typography>
                        <Typography sx={{ mt: 4, color: "#4C4C4D", fontWeight: "700" }}>/month</Typography>
                    </Box>
                    <Box sx={{ height: "auto", justifySelf: "center", mb: 5, mx: 2, width: "90%", bgcolor: "white", pb: 3, fontSize: 13 }}>
                        <Typography sx={{ margin: 'auto', textAlign: 'center', color: "#262626", pt: 2, fontSize: 14, pb: 2 }}>Available Features</Typography>
                        {
                            proPlane.map((plan, index) => (
                                <Box key={index} sx={{ mt: 1, mx: 4, py: 1, border: "0.2px solid", borderColor: "#dedede" }}><CheckIcon sx={{ ml: 1, mr: 1, p: 0.2, bgcolor: "#FFF4E5", width: 18, height: 18, fontSize: 14 }} />{plan}</Box>
                            ))
                        }

                    </Box>
                    <Button fullWidth sx={{ bgcolor: "#FF9500", color: "#FFFFFF" }}>Get Started</Button>
                </Box>
            </Container>
        </Grid>
    )
}

export default Pricing
