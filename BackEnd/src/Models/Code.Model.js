import mongoose, { Schema } from "mongoose";

const codeSchema = new Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: "User" },
    code: { type: String, required: true },
    feedback: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Code = mongoose.model("Code", codeSchema);
