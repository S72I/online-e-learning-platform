import mongoose from "mongoose";

const purchasedCourseSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    courses: [{ type: String, required: true }],
});

export const PurchasedCourse = mongoose.models.PurchasedCourse || mongoose.model("PurchasedCourse", purchasedCourseSchema);

export default PurchasedCourse;
