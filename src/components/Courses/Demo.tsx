// 'use client';

// import { Button } from '@mui/material';
// import React, { useState } from 'react';

// const Demo = () => {
//     const [imageUpload, setImageUpload]: any = useState(null);

//     const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         try {
//             const file = event.target.files?.[0];
//             if (!file) return;

//             console.log("Selected file:", file);

//             const data = new FormData();
//             data.append("file", file);
//             data.append("upload_preset", "cloudinaryDemo");
//             setImageUpload(data);
//         } catch (error) {
//             console.error("Error uploading file:", error);
//         }
//     };

//     const handleSubmit = async () => {
//         if (!imageUpload) {
//             console.error("No file selected.");
//             return;
//         }

//         const res = await fetch("https://api.cloudinary.com/v1_1/dmgkiiaqo/image/upload", {
//             method: "POST",
//             body: imageUpload,
//         });

//         if (!res.ok) {
//             throw new Error(`Upload failed: ${res.status}`);
//         }

//         const uploadedUrl = await res.json();
//         console.log("Uploaded URL:", uploadedUrl.secure_url);
//     };

//     return (
//         <div>
//             <input type="file" accept='video/*' onChange={handleChange} />
//             <Button variant="contained" onClick={handleSubmit}>
//                 Submit Image
//             </Button>
//         </div>
//     );
// };

// export default Demo;


'use client';

import { Button } from '@mui/material';
import React, { useState } from 'react';

const Demo = () => {
    const [videoUpload, setVideoUpload]: any = useState(null);

    const handleChange = async (event: any) => {
        try {
            const file = event.target.files?.[0];
            if (!file) return;

            console.log("Selected file:", file);

            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "cloudinaryDemo");
            setVideoUpload(data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleSubmit = async () => {
        if (!videoUpload) {
            console.error("No file selected.");
            return;
        }

        const res = await fetch("https://api.cloudinary.com/v1_1/dmgkiiaqo/video/upload", {
            method: "POST",
            body: videoUpload,
        });

        if (!res.ok) {
            throw new Error(`Upload failed: ${res.status}`);
        }

        const uploadedUrl = await res.json();
        console.log("Uploaded URL:", uploadedUrl.secure_url);
    };

    return (
        <div>
            <input type="file" accept='video/*' onChange={handleChange} />
            <Button variant="contained" onClick={handleSubmit}>
                Submit Video
            </Button>
        </div>
    );
};

export default Demo;
