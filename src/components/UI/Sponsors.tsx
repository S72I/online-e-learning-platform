'use client'

import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react'

const sponsors = [
    {
        id: 1,
        logo: '/images/sponsors/zapier.svg'
    },
    {
        id: 2,
        logo: '/images/sponsors/spotify.svg'
    },
    {
        id: 3,
        logo: '/images/sponsors/zoom.svg'
    },
    {
        id: 4,
        logo: '/images/sponsors/amazon.svg'
    },
    {
        id: 5,
        logo: '/images/sponsors/adobe.svg'
    },
    {
        id: 6,
        logo: '/images/sponsors/notion.svg'
    },
    {
        id: 7,
        logo: '/images/sponsors/netflix.svg'
    },
];

const Sponsors = () => {
    return (
        <Box sx={{
            margin: 'auto',
            width: "92%",
            borderRadius: 1,
            height: 60,
            bgcolor: "white",
            px: { md: 4, xs: 2, lg: 6, xl: 6 },
            display: 'flex',
            justifyContent: 'space-between',
            py: 0.5,
            mb: 10
        }}>
            {sponsors.map((data) => (
                <Box alignItems={'center'} sx={{
                    justifyContent: 'space-between',
                    alignItems: "center",
                    display: 'flex',
                    px: 2,
                    width: 200,
                    borderRight: "0.5px solid",
                    borderColor: "#F2F0EF"
                }} key={data.id}>
                    <Image alt='' style={{ margin: "auto" }} width={50} height={60} src={`${data.logo}`} />
                </Box>
            ))}
        </Box>
    )
}
export default Sponsors