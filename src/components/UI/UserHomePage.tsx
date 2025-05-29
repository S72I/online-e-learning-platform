'use client'

import React, { useState } from 'react'
import CustomCard from '../UI/CustomCard'
import TestimonialsCard from '../UI/TestimonialsCard'
import Pricing from '../UI/Pricing'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import SectionHeader from '../UI/SectionHeader'
import BenefitsCards from '../UI/BenefitsCards'
import Image from 'next/image'
import Sponsors from '../UI/Sponsors'
import ElectricBoltSharpIcon from '@mui/icons-material/ElectricBoltSharp';
import { withAuth } from '../withAuth'
import Link from 'next/link'

const UserHomePage = () => {


  return (
    // <main>
    //   <Container
    //     maxWidth={false}
    //     sx={{
    //       px: { md: 4, xs: 2, lg: 6, xl: 6 },
    //       width: "60%",
    //       height: "auto",
    //       mb: 10, mt: 7,
    //       overflow: 'hidden',
    //       justifyContent: 'center',

    //     }} >

    //     <Box sx={{
    //       borderRadius: 1,
    //       width: "90%",
    //       height: "auto",
    //       py: 1,
    //       justifySelf: "center",
    //       alignItems: 'center',
    //       bgcolor: 'white',
    //       display: 'flex',
    //       justifyContent: 'center'
    //     }}>
    //       <Image src={"/logo.svg"} alt='' width={30} height={30} style={{
    //         position: 'absolute',
    //         left: 350,
    //         top: 170
    //       }} />
    //       <ElectricBoltSharpIcon sx={{ fontSize: 50, p: 1, mr: 1.5, bgcolor: "#FFF4E5" }} />
    //       <Box sx={{ display: 'flex', }}>
    //         <Typography sx={{ fontSize: 40, fontFamily: "sans-serif", color: '#FF9500', fontWeight: 'bold' }}>Unlock</Typography>
    //         <Typography sx={{ fontSize: 40, ml: 1, fontFamily: "sans-serif", color: '#1A1A1A', fontWeight: 'bold' }}>Your Creative Potential</Typography>
    //       </Box>
    //     </Box>
    //     <Typography
    //       sx={{
    //         fontSize: 30,
    //         fontWeight: '400',
    //         width: "90%",
    //         color: "#262626",
    //         height: "auto",
    //         py: 1,
    //         justifySelf: "center",
    //         alignItems: 'center',
    //         display: 'flex',
    //         justifyContent: 'center'
    //       }}>with Online Design and Development Courses.</Typography>
    //     <Typography
    //       sx={{
    //         fontSize: 15,
    //         fontWeight: '400',
    //         width: "90%",
    //         color: "#262626",
    //         height: "auto",
    //         justifySelf: "center",
    //         alignItems: 'center',
    //         display: 'flex',
    //         justifyContent: 'center'
    //       }}>Learn from Industry Experts and Enhance Your Skills.</Typography>
    //     <Box sx={{
    //       marginTop: 6,
    //       height: "auto",
    //       display: 'flex',
    //       justifyContent: 'center'
    //     }}>
    //       <Button sx={{ fontWeight: 'bold', p: 1.5, mr: 1, bgcolor: "#FF9500", color: "white" }}>Explore Courses</Button>
    //       <Button sx={{ fontWeight: '700', p: 1.5, bgcolor: "white", color: "black" }}>View Pricing</Button>

    //     </Box>

    //   </Container>

    //   <Sponsors />
    //   <Grid container spacing={2} sx={{ margin: 'auto', justifyContent: 'center', px: { md: 4, xs: 2, lg: 6, xl: 6 }, }}>
    //     <Image width={1400} height={500} src={"/images/thumbnails/homeThumbnail.png"} alt='' />
    //   </Grid>

    //   <SectionHeader
    //     title="Benefits"
    //     description="Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in."
    //     action={
    //       <Typography sx={{ border: "0.2px solid", px: 3, bgcolor: "#FCFCFD", borderColor: "transparent", fontSize: 13, py: 1 }}>
    //         View All
    //       </Typography>
    //     }
    //   />
    //   <BenefitsCards />
    //   <SectionHeader
    //     title="Our Courses"
    //     description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque molestiae nesciunt ratione consectetur ducimus eum id excepturi saepe, laudantium veniam velit animi rerum, corporis non sit temporibus ea! Esse, pariatur!"
    //     action={
    //       <Typography sx={{ border: "0.2px solid", px: 3, bgcolor: "#FCFCFD", borderColor: "transparent", fontSize: 13, py: 1 }}>
    //         View All
    //       </Typography>
    //     }
    //   />
    //   <CustomCard />
    //   <SectionHeader
    //     title="Our Testimonials"
    //     description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque molestiae nesciunt ratione consectetur ducimus eum id excepturi saepe, laudantium veniam velit animi rerum, corporis non sit temporibus ea! Esse, pariatur!"
    //     action={
    //       <Typography sx={{ border: "0.2px solid", px: 3, bgcolor: "#FCFCFD", borderColor: "transparent", fontSize: 13, py: 1 }}>
    //         View All
    //       </Typography>
    //     }
    //   />
    //   <TestimonialsCard />
    //   <SectionHeader
    //     title="Our Pricing"
    //     description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque molestiae nesciunt ratione consectetur ducimus eum id excepturi saepe, laudantium veniam velit animi rerum, corporis non sit temporibus ea! Esse, pariatur!"
    //     action={
    //       <Box sx={{ display: 'flex', p: 0.8, bgcolor: '#FCFCFD' }}>
    //         <Typography sx={{ border: "0.2px solid", px: 3, bgcolor: "#FF9500", borderColor: "transparent", fontSize: 13, py: 1 }}>Monthly</Typography>
    //         <Typography sx={{ border: "0.2px solid", px: 3, bgcolor: "#FCFCFD", borderColor: "transparent", fontSize: 13, py: 1 }}>Yearly</Typography>
    //       </Box>
    //     }
    //   />
    //   <Pricing />
    // </main >

    <main>
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          width: { xs: '100%', md: '80%', lg: '60%' },
          mb: { xs: 5, md: 10 },
          mt: { xs: 4, sm: 5, md: 7 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Box sx={{
          borderRadius: 1,
          width: { xs: '100%', sm: '90%' },
          py: 1,
          bgcolor: 'white',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          mb: 2
        }}>
          <ElectricBoltSharpIcon sx={{
            fontSize: { xs: 40, sm: 50 },
            p: 1,
            mr: { sm: 1.5 },
            mb: { xs: 1, sm: 0 },
            bgcolor: "#FFF4E5"
          }} />
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <Typography sx={{
              fontSize: { xs: 30, sm: 40 },
              fontFamily: "sans-serif",
              color: '#FF9500',
              fontWeight: 'bold'
            }}>
              Unlock
            </Typography>
            <Typography sx={{
              fontSize: { xs: 30, sm: 40 },
              ml: { sm: 1 },
              fontFamily: "sans-serif",
              color: '#1A1A1A',
              fontWeight: 'bold'
            }}>
              Your Creative Potential
            </Typography>
          </Box>
          {/* <Image
                        src="/logo.svg"
                        alt="logo"
                        width={30}
                        height={30}
                        style={{
                            position: 'absolute',
                            left: { xs: 20, md: 350 },
                            top: { xs: 10, md: 170 },
                            display: { xs: 'none', md: 'block' }
                        }}
                    /> */}
          {/* <Image
            src="/logo.svg"
            alt="logo"
            width={30}
            height={30}
            style={{
              position: 'absolute',
              left: 350,
              top: 170,
              display: 'none',
              '@media (min-width: 900px)': {
                display: 'block'
              }
            }}
            sx={{
              position: 'absolute',
              left: { xs: 20, md: 350 },
              top: { xs: 10, md: 170 },
              display: { xs: 'none', md: 'block' }
            }}
          /> */}

          <Image src={"/logo.svg"} alt='' width={30} height={30} style={{
            position: 'absolute',
            left: -30,
            top: -30
          }} />
        </Box>

        <Typography sx={{
          fontSize: { xs: 20, sm: 25, md: 30 },
          fontWeight: '400',
          width: { xs: '100%', sm: '90%' },
          color: "#262626",
          py: 1,
        }}>
          with Online Design and Development Courses.
        </Typography>

        <Typography sx={{
          fontSize: 15,
          fontWeight: '400',
          width: { xs: '100%', sm: '90%' },
          color: "#262626",
        }}>
          Learn from Industry Experts and Enhance Your Skills.
        </Typography>

        <Box sx={{
          marginTop: { xs: 4, sm: 6 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          width: '100%',
          justifyContent: 'center'
        }}>
          <Button component={Link}
            href='/allcourses'
            variant="contained"
            sx={{
              fontWeight: 'bold',
              py: 1.5,
              bgcolor: "#FF9500",
              '&:hover': { bgcolor: "#e68600" },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Explore Courses
          </Button>
          <Button component={Link}
            href='/pricing'
            variant="outlined"
            sx={{
              fontWeight: '700',
              py: 1.5,
              color: "black",
              borderColor: 'grey.300',
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            View Pricing
          </Button>
        </Box>
      </Container>

      <Sponsors />

      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 2 } }}>
        {/* <Image
          width={1400}
          height={500}
          src="/images/thumbnails/homeThumbnail.png"
          alt="home thumbnail"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover'
          }}
        /> */}
        {/* <video width="80%" height="auto" controls>
          <source src={"/images/landingPageVideo.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <video
          width={1400}
          height={500}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: 10
          }}
          controls autoPlay>
          <source src="images/landingPageNewVideo.mp4" type="video/mp4" />
        </video>
        {/* <video width="80%" height="auto" controls>
          <source src="images/landingPageVideo.mp4" type="video/mp4" />
          <p>Your browser does not support the video tag.
            <a href="images/landingPageVideo.mp4" download>Download the video here</a>.</p>
        </video> */}
      </Container>

      <SectionHeader
        title="Benefits"
        description="Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in."
        action={
          <Button variant="outlined" size="small" sx={{ fontSize: 13 }}>
            View All
          </Button>
        }
      />
      <BenefitsCards />

      <SectionHeader
        title="Our Courses"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque molestiae nesciunt ratione consectetur ducimus eum id excepturi saepe, laudantium veniam velit animi rerum, corporis non sit temporibus ea! Esse, pariatur!"
        action={
          <Button variant="outlined" size="small" sx={{ fontSize: 13 }}>
            View All
          </Button>
        }
      />
      <CustomCard />

      <SectionHeader
        title="Our Testimonials"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque molestiae nesciunt ratione consectetur ducimus eum id excepturi saepe, laudantium veniam velit animi rerum, corporis non sit temporibus ea! Esse, pariatur!"
        action={
          <Button variant="outlined" size="small" sx={{ fontSize: 13 }}>
            View All
          </Button>
        }
      />
      <TestimonialsCard />

      <SectionHeader
        title="Our Pricing"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque molestiae nesciunt ratione consectetur ducimus eum id excepturi saepe, laudantium veniam velit animi rerum, corporis non sit temporibus ea! Esse, pariatur!"
        action={
          <Box sx={{
            display: 'flex',
            p: 0.5,
            bgcolor: '#FCFCFD',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey.300',
            width: { xs: '100%', sm: 'auto' }
          }}>
            <Button
              size="small"
              sx={{
                fontSize: { xs: 12, sm: 13 },
                bgcolor: "#FF9500",
                color: 'white',
                '&:hover': { bgcolor: "#e68600" },
                width: { xs: '50%', sm: 'auto' },
                px: { xs: 1, sm: 2 }
              }}
            >
              Monthly
            </Button>
            <Button
              size="small"
              sx={{
                fontSize: { xs: 12, sm: 13 },
                color: 'text.primary',
                bgcolor: 'transparent',
                width: { xs: '50%', sm: 'auto' },
                px: { xs: 1, sm: 2 }
              }}
            >
              Yearly
            </Button>
          </Box>
        }
        sx={{ mb: { xs: 4, md: 6 } }}
      />
      <Pricing />
    </main>
  )
}

export default withAuth(UserHomePage)
