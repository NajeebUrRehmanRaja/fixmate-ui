import { Code } from "../Models/Code.Model.js";
import { codeReviewer, bugFinder } from "../Services/ai.service.js";

const reviewCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ msg: "Code is required. Please enter code for review" });
    }

    if (typeof code !== "string") {
      return res.status(400).json({ msg: "Code must be in string format" });
    }

    const aiResponse = await codeReviewer(code);
    console.log("Ai", aiResponse);

    if (aiResponse === null) {
      return res
        .status(500)
        .json({ msg: "Something went wrong while reviewing code" });
    }

    res
      .status(200)
      .json({ msg: "Code review successfully.", feedback: aiResponse });
  } catch (error) {
    console.log("Something went wrong while reviewing code: ", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const findBugs = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ msg: "Code is required. Please enter code for bug detection" });
    }

    if (typeof code !== "string") {
      return res.status(400).json({ msg: "Code must be in string format" });
    }

    const aiResponse = await bugFinder(code);
    console.log("Ai", aiResponse);

    if (aiResponse === null) {
      return res
        .status(500)
        .json({ msg: "Something went wrong while detecting bugs" });
    }

    res
      .status(200)
      .json({ msg: "Bugs Detected successfully.", feedback: aiResponse });
  } catch (error) {
    console.log("Something went wrong while detecting bugs: ", error);
    res.status(500).json({ msg: "Server Error" });
  }
};
const saveCodeSnippet = async (req, res) => {
  try {
    const { code, feedback } = req.body;
    if (!code || !feedback) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const codeSnippet = await Code.create({
      userid: req.userId,
      code,
      feedback,
    });

    if (!codeSnippet) {
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

const getUserCodeSnippets = async (req, res) => {
  try {
    const snippets = await Code.find({ userid: req.userId }).sort({
      createdAt: -1,
    });

    if (!snippets || snippets.length === 0) {
      return res.status(404).json({ msg: "No code Snippets found" });
    }

    res.status(200).json({ msg: "User code snippets fetched succesfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

const deleteCodeSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCodeSnippet = await Code.findOneAndDelete({
      _id: id,
      userid: req.userId,
    });

    if (!deleteCodeSnippet) {
      res.status(404).json({ msg: "Code snippet not found or not authorized" });
    }

    res.status(200).json({ msg: " Code snippet deleted succesfully " });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

const updateCodeSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, feedback } = req.body;

    if (!code && !feedback) {
      return res.status(400).json({
        msg: "At least one field (code or feedback) is required to update",
      });
    }

    const updateCodeSnippet = await Code.findByIdAndUpdate(
      {
        _id: id,
        userid: req.userId,
      },
      {
        $set: { ...(code && { code }), ...(feedback && { feedback }) },
      },
      {
        new: true,
      }
    );

    if (!updateCodeSnippet) {
      return res
        .status(404)
        .json({ msg: "Code snippet not found or not authorized" });
    }

    res
      .status(200)
      .json({ msg: "Code snippet updated successfully", updatedSnippet });
  } catch (error) {
    console.log("Something went wrong while updating code snippet: ", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export {
  reviewCode,
  findBugs,
  saveCodeSnippet,
  getUserCodeSnippets,
  deleteCodeSnippet,
  updateCodeSnippet,
};
