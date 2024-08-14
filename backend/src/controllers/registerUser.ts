import { Request, Response } from "express";
import { User } from "../Models/schemas";
import { generateToken, verifyToken } from "../middleware/jwtToken";
import { sendEmail } from "../mailService";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CustomRequest } from "../middleware/logger";

const verifyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Request received with body:", req.body);
    const { name, username, password, email } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const user = { name, username, password, email };
    const token = generateToken(user);
    // console.log(token);

    await sendEmail(email, token, "verify?type=1&");
    res
      .status(200)
      .json({ message: "Verification email sent successfully, Check Inbox" });
  } catch (err) {
    res.status(400).json({ error: "Error processing Request" });
    console.log(err);
  }
};

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ message: "User need to log in to access this page." });
      return;
    }
    const token = authHeader.split(" ")[1];
    const user = verifyToken(token) as JwtPayload;
    if (user === null || !user) {
      res.status(403).json({ message: "Unauthorized request" });
      return;
    }
    const saltRounds = 10;
    const cryptPassword = await bcrypt.hash(user.password, saltRounds);
    console.log(cryptPassword);

    const newUser = new User({
      name: user.name,
      email: user.email,
      password: cryptPassword,
      username: user.username,
    });
    await newUser.save();
    console.log(newUser);

    const responsetoken = generateToken({
      email: newUser.email,
      id: newUser._id,
      username: newUser.username,
    });
    res
      .status(200)
      .json({ message: "User Registered successfully", token: responsetoken });
  } catch (err) {
    res.status(400).json({ error: "Error processing Request" });
    console.log(err);
  }
};

const updateUser = async (req: CustomRequest, res: Response) => {
  try {
    const { name, username, password } = req.body;
    if (name) {
      await User.findByIdAndUpdate(req.user?._id, { name }, { new: true });
    }
    if (username) {
      await User.findByIdAndUpdate(req.user?._id, { username }, { new: true });
    }
    if (password) {
      const saltRounds = 10;
      const cryptPassword = await bcrypt.hash(password, saltRounds);
      await User.findByIdAndUpdate(
        req.user?._id,
        { password: cryptPassword },
        { new: true }
      );
    }
    res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error processing Request" });
    console.log(err);
  }
};

const verifyUpdatedEmail = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.query;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    const token = generateToken({ email: email });
    await sendEmail(
      email as string,
      token,
      `verify?type=0&id=${req.user?._id}&`
    );
    res.status(200).json({
      message: "A verification link to the email has been sent!",
    });
  } catch (err) {
    res.status(400).json({ error: "Error processing Request" });
    console.log(err);
  }
};

const updateEmail = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.query.id;
    const resetToken = req.query.token as string;
    if (!resetToken) {
      res.status(401).json({ error: "Unauthorized request" });
      return;
    }
    const decodedToken = verifyToken(resetToken) as JwtPayload;
    console.log(decodedToken);

    // console.log(id);

    const updateUser = await User.findByIdAndUpdate(
      id,
      { email: decodedToken.email },
      { new: true }
    );
    const newToken = generateToken({
      id: updateUser?._id,
      username: updateUser?.username,
      email: updateUser?.email,
    });
    res.status(200).json({ token: newToken });
  } catch (err) {
    res.status(400).json({ error: "Error processing Request" });
    console.log(err);
  }
};

export {
  verifyUser,
  registerUser,
  updateEmail,
  verifyUpdatedEmail,
  updateUser,
};
