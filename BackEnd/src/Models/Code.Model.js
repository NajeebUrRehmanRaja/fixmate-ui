import mongoose, { Schema } from "mongoose";

const codeSchema = new Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const userId = mongoose.model("UserId", codeSchema);
