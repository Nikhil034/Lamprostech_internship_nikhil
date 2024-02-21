import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    project_title: {
        type: String,
        required: true,
    },
    project_description: {
        type: String,
        required: true,
    },
    project_budegt: {
        type: Number,
        required: true,
    },
    project_status: {
        type: String,
        required: true,
        default: "Ongoing",
    },
    project_technology: {
        type: String,
        required: true,
    },
    project_client_email: {
        type: String,
        required: true,
        unique: true,
    },
    project_duration: {
        type: Number,
        required: true,
    },
    project_lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    }


}, { timestamps: true })

export const Project = mongoose.model("Project", ProjectSchema);