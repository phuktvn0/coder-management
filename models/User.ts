import mongoose, { Schema, model, ObjectId } from "mongoose";

interface dataUser {
  name: string;
  role: string;
  _id?: ObjectId;
}

//Create schema
const userSchema = new Schema<dataUser>(
  {
    name: { type: String, required: true },
    role: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = model<dataUser>("User", userSchema);

export default User;
