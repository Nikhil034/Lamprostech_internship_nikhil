import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        task_description: {
            type: String,
            required: true,
        },
        task_date: {
            type: String,
            required: true,
        },
        task_status: {
            type: Number,
            required: true,
            default: 0
        },
        task_priority: {
            type: String,
            required: true,
            enum: ["HIGH", "NORMAL", "LOW"],
            default: "NORMAL"
        }
    },
    { timestamps: true });


export const Task = mongoose.model("Task", TaskSchema);