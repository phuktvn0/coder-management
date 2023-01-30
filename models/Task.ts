import mongoose, { Schema, model, ObjectId } from "mongoose";

interface dataTask {
  name: string;
  description: string;
  assignee: ObjectId | null;
}

//Create schema
const taskSchema = new Schema<dataTask>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    assignee: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Task = model<dataTask>("Task", taskSchema);

export default Task;
