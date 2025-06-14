'use client'

import React from 'react';
import { CircularProgress} from '@mui/material';
import { ILoadingProps } from '@/components/types/course';



const CustomLoading: React.FC<ILoadingProps> = ({
    sx,
    size = 40,
    color = 'primary',
}) => (
    <CircularProgress sx={sx} size={size} color={color} />
);

export default CustomLoading;
