import React from 'react';
import { TextField } from '@mui/material';
import { levelOptions } from '@/lib/utils/constants';
import CustomDropDown from '@/components/UI/CustomDropDown';
import { UseFormRegister, Control, FieldErrors } from 'react-hook-form';
import { ICourse } from '@/components/Types/course';



type CourseBasicInfoProps = {
    errors: FieldErrors<ICourse>;
    register: UseFormRegister<ICourse>;
    control: Control<ICourse>;
    courseData: ICourse;
    handleChange: (field: keyof ICourse, value: string) => void;
};

const CourseBasicInfo: React.FC<CourseBasicInfoProps> = ({
    errors,
    register,
    control,
    courseData,
    handleChange
}) => (
    <>
        <TextField
            label="Course Title"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.title}
            helperText={errors.title && 'Title is required'}
            {...register('title', {
                required: 'Title is required',
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange('title', e.target.value),
            })}
            value={courseData.title}
        />
        <CustomDropDown
            label="Level"
            value={courseData.level}
            setValue={(val: string) => handleChange('level', val)}
            options={levelOptions}
        />
        <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
            error={!!errors.description}
            helperText={errors.description && 'Description is required'}
            {...register('description', {
                required: 'Description is required',
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange('description', e.target.value),
            })}
            value={courseData.description}
        />
    </>
);

export default CourseBasicInfo;
