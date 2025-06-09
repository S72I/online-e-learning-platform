import React from 'react';
import { Box, IconButton, Typography, CircularProgress, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import { ICourse } from '@/components/Types/course';
import CustomLoading from '@/components/UI/CustomLoading';



type CourseImagesProps = {
    imageArray: string[];
    imageLoading: boolean;
    setImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setImageArray: React.Dispatch<React.SetStateAction<string[]>>;
    setCourseData: React.Dispatch<React.SetStateAction<ICourse>>;
    setValue: (field: 'images', value: string[], options?: { shouldValidate: boolean }) => void;
};


const MAX_IMAGES = 3;

const CourseImages: React.FC<CourseImagesProps> = ({
    imageArray,
    imageLoading,
    setImageLoading,
    setImageArray,
    setCourseData,
    setValue
}) => {
    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (imageArray.length >= MAX_IMAGES) {
            toast.error(`You can upload up to ${MAX_IMAGES} images.`);
            return;
        }

        setImageLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append('upload_preset', 'images_present');

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dmgkiiaqo/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();



            if (data.secure_url) {
                const updatedArray = [...imageArray, data.secure_url];
                setImageArray(updatedArray);

                setCourseData((prev) => ({
                    ...prev,
                    images: updatedArray,
                }));
                setValue('images', updatedArray, { shouldValidate: true });
            } else {
                toast.error("Image upload failed.");
            }
        } catch (err) {
            toast.error("Image upload failed.");
        } finally {
            setImageLoading(false);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedArray = imageArray.filter((_, i: number) => i !== index);
        setImageArray(updatedArray);
        setCourseData((prev) => ({
            ...prev,
            images: updatedArray,
        }));
        setValue('images', updatedArray, { shouldValidate: true });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mt: 3 }}>Images</Typography>
            <label htmlFor="add-image-input">
                <input
                    id="add-image-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                    disabled={imageLoading}
                />
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    component="span"
                    disabled={imageLoading || imageArray.length >= MAX_IMAGES}
                    sx={{ mt: 2, mb: 2 }}
                >
                    Add Image
                </Button>
            </label>
            {imageLoading &&
                // <CircularProgress size={24} sx={{ ml: 2 }} />
                <CustomLoading sx={{ mt: 5, display: 'block', mx: 'auto' }} />

            }
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                {imageArray.map((img: string, idx: number) => (
                    <Box
                        key={idx}
                        sx={{
                            position: 'relative'
                        }}
                    >
                        <img src={img} alt={`Course ${idx}`} width={100} style={{ borderRadius: 8, display: 'block' }} />
                        <IconButton
                            size="small"
                            onClick={() => handleRemoveImage(idx)}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                bgcolor: 'white'
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default CourseImages;
