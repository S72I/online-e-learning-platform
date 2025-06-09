import { Box, Button, Container, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import SectionHeader from './SectionHeader'
import { Achievements, Goals } from '@/components/Types/course'

const AboutUsPage = () => {
    return (
        <Container maxWidth={false}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 8,
                width: '92%',
                borderBottom: '0.5px solid',
                borderBottomColor: "#DCDCDC",
                justifySelf: 'center',
                pb: 4
            }}>
                <Typography sx={{ width: '50%', fontWeight: 'bold', fontSize: 30 }}>About Skillbridge</Typography>
                <Typography sx={{ width: '50%', color: '#59595A', fontSize: 12 }}>Welcome to our platform, where we are passionate about empowering individuals to master the world of design and development. We offer a wide range of online courses designed to equip learners with the skills and knowledge needed to succeed in the ever-evolving digital landscape.</Typography>
            </Box>
            <SectionHeader
                title="Achievements"
                description="Our commitment to excellence has led us to achieve significant milestones along our journey. Here are some of our notable achievements"
            />

            <Grid container spacing={2} sx={{ mt: 8, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                {Achievements.map((data, i) => (
                    <Grid
                        key={i}
                        size={{ xs: 16, md: 6, sm: 6, lg: 6, }}
                        sx={{
                            borderRadius: 4,
                            bgcolor: "white",
                            height: "auto", overflow: "hidden", width: "100%",
                        }}>

                        <Box sx={{ width: "100%", height: 200, px: 4, py: 3 }}>
                            <Image src={data.icon} alt='' width={50} height={50} />
                            <Typography sx={{ mt: 2, fontSize: 14, fontWeight: 700 }}>{data.title}</Typography>
                            <Typography sx={{ mt: 1, fontSize: 12 }}>{data.description}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <SectionHeader
                title="Our Goals"
                description="At SkillBridge, our goal is to empower individuals from all backgrounds to thrive in the world of design and development. We believe that education should be accessible and transformative, enabling learners to pursue their passions and make a meaningful impact.Through our carefully crafted courses, we aim to"
            />

            <Grid container spacing={2} sx={{ mt: 8, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                {Goals.map((data, i) => (
                    <Grid
                        key={i}
                        size={{ xs: 16, md: 6, sm: 6, lg: 6, }}
                        sx={{
                            borderRadius: 4,
                            bgcolor: "white",
                            height: "auto", overflow: "hidden", width: "100%",
                        }}>

                        <Box sx={{ width: "100%", height: 200, px: 4, py: 3 }}>
                            <Image src={data.icon} alt='' width={50} height={50} />
                            <Typography sx={{ mt: 2, fontSize: 14, fontWeight: 700 }}>{data.title}</Typography>
                            <Typography sx={{ mt: 1, fontSize: 12 }}>{data.description}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Box width={"93%"} display={'flex'} borderRadius={2} marginTop={10} justifySelf={"center"} height={"auto"} bgcolor={"white"} marginBottom={10}>
                <Box width={"70%"} alignContent={'center'} py={4}>
                    <Typography sx={{ px: 4, }} fontSize={40}><span style={{ color: "#FF9500" }}>Together</span>, let's shape the future of digital innovation</Typography>
                    <Typography sx={{ color: '#4C4C4D', fontSize: 15, px: 4 }}>Join us on this exciting learning journey and unlock your potential in design and development.</Typography>
                </Box>
                <Box width={"30%"} overflow={'hidden'} sx={{
                    justifyContent: 'flex-end',
                    display: 'flex',
                    px: 4,
                    alignContent: 'center',
                }}  >
                    <Button sx={{
                        bgcolor: '#FF9500',
                        px: 4,
                        alignSelf: 'center',
                        color: 'white',
                    }} >Join Now</Button>
                </Box>

            </Box>

        </Container>
    )
}

export default AboutUsPage