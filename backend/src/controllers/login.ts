import { Request, Response } from "express";
import { User } from "../Models/schemas";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../middleware/jwtToken";
import { sendEmail, sendFeedback } from "../mailService";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../middleware/logger";

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: email }, { username: email }],
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }
    const token = generateToken({
      id: user._id,
      email: user.email,
      username: user.username,
    });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const forgetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.query;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const resetToken = generateToken({ email: user.email });
    await sendEmail(user.email, resetToken, "resetPassword?");
    res.json({ message: "Reset password link sent to your email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { newPassword } = req.query;
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ error: "User need to log in to access this page." });
      return;
    }
    const resetToken = authHeader.split(" ")[1];
    const decodedToken = verifyToken(resetToken) as JwtPayload;
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword as string, saltRounds);
    await user.updateOne({ password: hashedPassword });
    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserDetails = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const handleSendFeedBack = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    const { text, subject } = req.body;
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    await sendFeedback(subject, text, user._id.toString(), user.email);
    res.status(200).json({ message: "Feedback sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  loginUser,
  forgetPassword,
  resetPassword,
  getUserDetails,
  handleSendFeedBack,
};
