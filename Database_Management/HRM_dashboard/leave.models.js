import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
    leave_reason: {
        type: String,
        required: true,
    },
    leave_date: {
        type: String,
        required: true,
    },
    leave_days: {
        type: Number,
        required: true,
    },
    leave_status: {
        type: String,
        enum: ["PENDING", "APPROVE"],
        default: "PENDING",
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },

}, { timestamps: true })

export const Leave = mongoose.model("Leave", LeaveSchema);