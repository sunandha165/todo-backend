import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String }, // store as ISO date-string or readable string
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
