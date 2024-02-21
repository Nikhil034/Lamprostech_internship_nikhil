import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    expense_description: {
        type: String,
        required: true,
    },
    expense_cost: {
        type: Number,
        required: true,
    },
    expense_date: {
        type: String,
        required: true,
    },
    expense_payment_type: {
        type: String,
        required: true,
        enum: ["CASH", "CARD", "ONLINE"],
    },
    expense_for: {
        type: String,
    }
}, { timestamps: true });

export const Expense = mongoose.model("Expense", ExpenseSchema);