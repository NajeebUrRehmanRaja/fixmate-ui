import { GoogleGenAI } from "@google/genai";
import { env } from "./env.config.js";

export const ai = new GoogleGenAI({
  apiKey: env.GOOGLE_API_KEY,
});
