import { Code } from "../Models/Code.Model.js";
import { codeReviewer } from "../Services/ai.service.js";

const reviewCode = async(req,res)=>{
    try {
        const {code} =req.body;

        if(!code){
            return res
              .status(400)
              .json({ msg: "Code is required. Please enter code for review" });
        }

        if(typeof code !== "string"){
            return res
              .status(400)
              .json({ msg: "Code must be in string format" });
        }

        const aiResponse = await codeReviewer(code);
        console.log("Ai",aiResponse)

        if (aiResponse === null) {
            return res
              .status(500)
              .json({ msg: "Something went wrong while reviewing code" });
        }

         res.status(200).json({ msg: "Code review successfully.", feedback: aiResponse });
        
    } catch (error) {
        console.log("Something went wrong while reviewing code: ",error)
         res.status(500).json({ msg: "Server Error" });
    } 
}

const findBugs = async(req,res)=>{};

const saveCodeSnippet = async (req, res) => {
    try {
        const {code,feedback} = req.body;
        if(!code || !feedback){
          return res.status(400).json({ msg: "All fields are required" });
        }

        const codeSnippet = await Code.create({
          userid: req.userId,
          code,
          feedback
        });

        if(!codeSnippet){
            return res
               .status(500)
               .json({ msg: "Something went wrong while saving code snippet" });
        }

        res
          .status(200)
          .json({ msg: "Code snippet saved successfully", codeSnippet });
    } catch (error) {
        console.log("Something went wrong while saving code snippet: ", error);
        res.status(500).json({ msg: "Server Error" });
    }
};

const getUserCodeSnippets = async (req,res)=>{}

const deleteCodeSnippet = async (req, res) => {};

const updateCodeSnippet = async (req, res) => {};


export {
  reviewCode,
  findBugs,
  saveCodeSnippet,
  getUserCodeSnippets,
  deleteCodeSnippet,
  updateCodeSnippet,
};