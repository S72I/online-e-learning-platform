'use client'

import React, { useState } from 'react'
import CustomCard from '../UI/CustomCard'
import TestimonialsCard from '../UI/TestimonialsCard'
import Pricing from '../UI/Pricing'
import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material'
import SectionHeader from '../UI/SectionHeader'
import BenefitsCards from '../UI/BenefitsCards'
import Image from 'next/image'
import Sponsors from '../UI/Sponsors'
import ElectricBoltSharpIcon from '@mui/icons-material/ElectricBoltSharp';
import { useRouter } from 'next/navigation'

const UserHomePage = () => {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [billing, setBilling] = useState<"monthly" | "yearly">('monthly');


  const handlePricingClick = () => {
    const element = document.getElementById('pricing')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const handleCoursesClick = () => {
    const element = document.getElementById('courses')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handelGetItNowClick = () => {
    router.push("/signup")
  }
  return (
    <> {
      loading ? (
        <Typography sx={{ mt: 5, textAlign: 'center' }}>
          <CircularProgress />
        </Typography>) : (

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
              <Button
                onClick={() => handleCoursesClick()}
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
              <Button
                onClick={() => handlePricingClick()}
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
          </Container >

          <Sponsors />

          <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 2 } }}>
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
          <Box id="courses">
            <SectionHeader
              title="Our Courses"
              description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque molestiae nesciunt ratione consectetur ducimus eum id excepturi saepe, laudantium veniam velit animi rerum, corporis non sit temporibus ea! Esse, pariatur!"
              action={
                <Button variant="outlined" size="small" sx={{ fontSize: 13 }}>
                  View All
                </Button>
              }
            />
          </Box>
          <CustomCard limit={6} action={
            <Box width={"100%"}
              sx={{ px: 2, my: 5, display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => handelGetItNowClick()}
                sx={{
                  mx: 1,
                  bgcolor: "#F1F1F3",
                  fontSize: 12,
                  width: "80%",
                  fontWeight: 'bold',
                  py: 1.5,
                  color: "#262626"
                }}>Get it Now</Button>
              {/* <Button
                onClick={() => handelViewPurchaseClick()}
                sx={{
                  mx: 1,
                  bgcolor: "#FF9500",
                  '&:hover': { bgcolor: "#e68600" },
                  fontSize: 12,
                  width: "50%",
                  color: "#fff",
                  fontWeight: 'bold',
                  py: 1.5
                }}>Purchase</Button> */}

            </Box>
          } />

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
          <Box id="pricing">
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
                      bgcolor: billing === 'monthly' ? "#FF9500" : 'transparent',
                      color: billing === 'monthly' ? 'white' : 'text.primary',
                      '&:hover': { bgcolor: billing === 'monthly' ? "#e68600" : 'grey.100' },
                      width: { xs: '50%', sm: 'auto' },
                      px: { xs: 1, sm: 2 }
                    }}
                    onClick={() => setBilling('monthly')}
                  >
                    Monthly
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      fontSize: { xs: 12, sm: 13 },
                      bgcolor: billing === 'yearly' ? "#FF9500" : 'transparent',
                      color: billing === 'yearly' ? 'white' : 'text.primary',
                      '&:hover': { bgcolor: billing === 'yearly' ? "#e68600" : 'grey.100' },
                      width: { xs: '50%', sm: 'auto' },
                      px: { xs: 1, sm: 2 }
                    }}
                    onClick={() => setBilling('yearly')}
                  >
                    Yearly
                  </Button>
                </Box>
              }
              sx={{ mb: { xs: 4, md: 6 } }}
            />
          </Box>
          <Pricing planType={billing} />
        </main >
      )
    }
    </>
  )
}

export default UserHomePage
