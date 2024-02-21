import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
    announcement_description: {
        type: String,
        required: true,
    },
    announcement_date: {
        type: String,
        required: true,
    }
}, { timestamps: true })


export const Announcement = mongoose.model("Announcement", AnnouncementSchema);
