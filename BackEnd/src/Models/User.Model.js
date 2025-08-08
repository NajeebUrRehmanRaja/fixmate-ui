import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, required: true },
    imgurl: { type: String },
    credit: { type: Number, default: 5 },
    stripeid: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
