import React from 'react';
import { CircularProgress, SxProps, Theme } from '@mui/material';
import { ILoadingProps } from '../Types/course';



const CustomLoading: React.FC<ILoadingProps> = ({
    sx,
    size = 40,
    color = 'primary',
}) => (
    <CircularProgress sx={sx} size={size} color={color} />
);

export default CustomLoading;
