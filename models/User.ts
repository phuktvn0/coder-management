import mongoose, { Schema, model, ObjectId } from "mongoose";

interface dataUser {
  name: string;
  role: string;
  _id?: ObjectId;
  status: string;
}

//Create schema
const userSchema = new Schema<dataUser>(
  {
    name: { type: String, required: true },
    role: { type: String },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = model<dataUser>("User", userSchema);

export default User;
