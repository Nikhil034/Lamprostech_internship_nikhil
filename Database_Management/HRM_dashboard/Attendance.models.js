import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    attedance_status: {
        type: String,
        required: true,
        enum: ["PRESENT", "LEAVE"],
        default: "PRESENT",
    },
    attendace_date: {
        type: String,
        required: true,
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },
}, { timestamps: true })

export const Attendance = mongoose.model("Attendance", AttendanceSchema);