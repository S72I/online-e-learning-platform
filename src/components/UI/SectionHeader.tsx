import { Box, Typography } from '@mui/material';

const SectionHeader = ({ title, description, action, sx = {} }: any) => {
    return (
        <Box sx={{ marginTop: 10, px: { md: 4, xs: 2, lg: 6, xl: 6 }, ...sx }}>
            <Typography sx={{ px: 4, fontWeight: 700, fontFamily: "revert", fontSize: 30 }}>{title}</Typography>
            <Box sx={{ display: 'flex', px: 4, justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                <Typography sx={{ color: "#59595A", fontSize: 14, width: "80%" }}>
                    {description}
                </Typography>
                {action}
            </Box>
        </Box>
    );
};

export default SectionHeader;
