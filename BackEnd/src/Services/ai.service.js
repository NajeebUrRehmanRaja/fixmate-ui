import { ai } from "../Config/ai.config.js";
import { CODE_REVIEW_PROMPT } from "../Constants/prompts.js";

const codeReviewer = async(code) => {
    try{
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: JSON.stringify(code),
            config:{
                 systemInstruction:CODE_REVIEW_PROMPT
            }
        })

        return response.text
    }catch(err){
        console.log("Error while reviewing code: ",err)
        return null;
    }
} 




export {codeReviewer}