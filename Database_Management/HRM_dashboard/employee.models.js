import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    employee_name: {
        type: String,
        required: true,
    },
    employee_email: {
        type: String,
        required: true,
        unique: true,
    },
    employee_role: {
        type: String,
        required: true
    },
    employee_experience: {
        type: Number,
        required: true
    },
    employee_phone: {
        type: Number,
        required: true,
    },
    employee_dob: {
        type: String,
        required: true
    },
    employee_blood_group: {
        type: String,
        required: true,
    },
    employee_salary: {
        type: Number,
        required: true
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },

}, { timestamps: true })


export const Employee = mongoose.model("Employee", EmployeeSchema);