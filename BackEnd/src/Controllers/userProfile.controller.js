import { User } from "../Models/UserProfile.Model.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not Found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};