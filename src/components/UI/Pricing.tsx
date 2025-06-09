'use client'
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import CustomPricing from "./CustomPricing";
import SectionHeader from "./SectionHeader";


const Pricing = () => {
    const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

    return (
        <>
            <Box id="pricing" sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <SectionHeader
                    title=""
                    description=""
                    action={
                        <Box
                            sx={{
                                display: "flex",
                                p: 0.5,
                                bgcolor: "#FCFCFD",
                                borderRadius: 1,
                                border: "1px solid",
                                borderColor: "grey.300",
                                width: { xs: "100%", sm: "auto" },
                            }}
                        >
                            <Button
                                size="small"
                                sx={{
                                    fontSize: { xs: 12, sm: 13 },
                                    bgcolor: billing === "monthly" ? "#FF9500" : "transparent",
                                    color: billing === "monthly" ? "white" : "text.primary",
                                    "&:hover": { bgcolor: billing === "monthly" ? "#e68600" : "grey.100" },
                                    width: { xs: "50%", sm: "auto" },
                                    px: { xs: 1, sm: 2 },
                                }}
                                onClick={() => setBilling("monthly")}
                            >
                                Monthly
                            </Button>
                            <Button
                                size="small"
                                sx={{
                                    fontSize: { xs: 12, sm: 13 },
                                    bgcolor: billing === "yearly" ? "#FF9500" : "transparent",
                                    color: billing === "yearly" ? "white" : "text.primary",
                                    "&:hover": { bgcolor: billing === "yearly" ? "#e68600" : "grey.100" },
                                    width: { xs: "50%", sm: "auto" },
                                    px: { xs: 1, sm: 2 },
                                }}
                                onClick={() => setBilling("yearly")}
                            >
                                Yearly
                            </Button>
                        </Box>
                    }
                />
            </Box>

            <CustomPricing planType={billing} />
        </>
    );
};

export default Pricing;
