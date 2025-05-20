import mongoose from 'mongoose'

const userSchema = new schema(
  {
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true },
    clerk: { type: String },
    imgurl: { type: String },
    credit: { type: Number, default: 5 },
    stripeid: { type: String },
    code: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);