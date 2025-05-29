
import { Box, Typography, Button } from '@mui/material';

const SectionHeader = ({ title, description, action, sx = {} }: any) => {
    return (
        <Box sx={{
            marginTop: { xs: 6, md: 10 },
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
            ...sx
        }}>
            <Typography sx={{
                px: { xs: 0, sm: 4 },
                fontWeight: 700,
                fontSize: { xs: 24, sm: 28, md: 30 },
                mb: { xs: 2, sm: 3 }
            }}>
                {title}
            </Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                px: { xs: 0, sm: 4 },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                mb: { xs: 3, sm: 5 },
                gap: { xs: 2, sm: 0 }
            }}>
                <Typography sx={{
                    color: "#59595A",
                    fontSize: 14,
                    width: { xs: '100%', sm: '70%', md: '80%' },
                    mb: { xs: action ? 2 : 0, sm: 0 }
                }}>
                    {description}
                </Typography>
                {action && (
                    <Box sx={{
                        alignSelf: { xs: 'flex-start', sm: 'center' },
                        width: { xs: '100%', sm: 'auto' }
                    }}>
                        {action}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default SectionHeader;