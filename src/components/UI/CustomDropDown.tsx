'use client'

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SxProps, Theme } from "@mui/material";

export type Option = {
    value: string;
    label: string;
};

export type CustomDropDownProps = {
    label: string;
    value: string;
    setValue: (value: string) => void;
    options: Option[];
    maxHeightValue?: number | string;
    error?: boolean;
    helperText?: string;
    sx?: SxProps<Theme>;
};

export default function CustomDropDown({
    label,
    value,
    setValue,
    options,
    maxHeightValue,
    error,
    helperText,
    sx,
}: CustomDropDownProps) {
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120, pb: 2, mt: 2 }}>
            <FormControl fullWidth sx={{ maxHeight: maxHeightValue, ...sx }} error={error}>
                <InputLabel id={`${label}-label`} error={error}>
                    {label}
                </InputLabel>
                <Select
                    sx={{ minHeight: 10 }}
                    labelId={`${label}-label`}
                    id={`${label}-select`}
                    value={value}
                    label={label}
                    onChange={handleChange}
                    error={error}
                >
                    {options.map((option: Option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                {helperText && (
                    <Box sx={{ color: "#d32f2f", fontSize: "0.75rem", mt: 0.5 }}>
                        {helperText}
                    </Box>
                )}
            </FormControl>
        </Box>
    );
}
