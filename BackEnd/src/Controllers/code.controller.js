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
    const deleteCode = await Code.findOneAndDelete({
      _id: id,
      userid: req.userId,
    });

    if (!deleteCode) {
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

    const codeSnippet = await Code.findById(id);

    if (!codeSnippet) {
      return res.status(404).json({ msg: "Code snippet not found" });
    }

    if (codeSnippet.userid.toString() !== req.userId.toString()) {
      return res
        .status(401)
        .json({
          msg: "Unauthorized: You are not allowed to update this code snippet",
        });
    }

    codeSnippet.code = code || codeSnippet.code;
    codeSnippet.feedback = feedback || codeSnippet.feedback;

    res
      .status(200)
      .json({ msg: "Code snippet updated successfully", updateCode });
  } catch (error) {
    console.log("Something went wrong while updating code snippet: ", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const getCodeStats = async (req, res) => {
  try {
    // Fetch all snippets for the logged-in user
    const snippets = await Code.find({ userid: req.userId });

    if (!snippets || snippets.length === 0) {
      return res.status(404).json({ msg: "No code snippets found" });
    }

    // Calculate stats
    const totalSnippets = snippets.length;
    const totalFeedbackLength = snippets.reduce(
      (sum, snip) => sum + (snip.feedback?.length || 0),
      0
    );
    const averageFeedbackLength = (totalFeedbackLength / totalSnippets).toFixed(
      2
    );

    // If codeQuality is stored in feedback as a number, parse it
    const qualities = snippets
      .map((snip) => snip.codeQuality)
      .filter((q) => typeof q === "number");

    const avgQuality = qualities.length
      ? (qualities.reduce((a, b) => a + b, 0) / qualities.length).toFixed(2)
      : null;

    // Guess most common language if stored (optional)
    const languageCounts = {};
    snippets.forEach((snip) => {
      if (snip.language) {
        languageCounts[snip.language] =
          (languageCounts[snip.language] || 0) + 1;
      }
    });
    const mostUsedLanguage =
      Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      null;

    res.status(200).json({
      msg: "Code statistics fetched successfully",
      stats: {
        totalSnippets,
        averageFeedbackLength,
        averageCodeQuality: avgQuality,
        mostUsedLanguage,
      },
    });
  } catch (error) {
    console.log("Error fetching code stats:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};
const getRecentActivity = async (req, res) => {
  try {
    // Find latest code snippets by the logged-in user, newest first
    const recentSnippets = await Code.find({ userid: req.userId })
      .sort({ createdAt: -1 }) // newest first
      .limit(10); // adjust number of activities to return

    if (!recentSnippets || recentSnippets.length === 0) {
      return res.status(404).json({ msg: "No recent activity found" });
    }

    // Map activity data
    const activityData = recentSnippets.map((snip) => ({
      id: snip._id,
      language: snip.language || "Unknown",
      createdAt: snip.createdAt,
      feedback: snip.feedback || "No feedback available",
    }));

    res.status(200).json({
      msg: "Recent activity fetched successfully",
      recentActivity: activityData,
    });
  } catch (error) {
    console.error("Error fetching recent activity:", error);
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
  getCodeStats,
  getRecentActivity,
};
