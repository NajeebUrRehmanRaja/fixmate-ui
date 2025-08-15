import mongoose from "mongoose";

const CodeSubmittedSchema = new mongoose.Schema({
  analysisResults: {
    type: Object,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export const CodeSubmitted = mongoose.model("CodeSubmitted", CodeSubmittedSchema);