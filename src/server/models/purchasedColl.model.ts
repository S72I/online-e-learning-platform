import mongoose from 'mongoose';

const PurchasedCourseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
});

export default mongoose.models.PurchasedCourse || mongoose.model('PurchasedCourse', PurchasedCourseSchema);