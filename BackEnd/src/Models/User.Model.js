import mongoose from 'mongoose'

const userSchema = new schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true },
  clerk: {  },
  imgurl: { },
  credit: { default: 5, },
  stripeid: {},
}, { timestamps: true}
);

export const User = mongoose.model("User", userSchema);