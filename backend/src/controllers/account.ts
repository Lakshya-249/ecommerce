import { CustomRequest } from "../middleware/logger";
import { User, Account } from "../Models/schemas";
import { Response } from "express";

const addAccount = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { card_number, expiry, cvv } = req.body;
    const id = req.user?._id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (!card_number || !expiry || !cvv) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const newAccount = new Account({ ...req.body, user: id });
    await newAccount.save();
    user.accounts.push(newAccount._id);
    await user.save();
    res.status(200).json({ message: "Account added successfully", newAccount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const listAccounts = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.user?._id;
    const accounts = await Account.find({ user: id });
    if (!accounts.length || !accounts) {
      res.status(404).json({ message: "No Accounts information available" });
      return;
    }
    res.status(200).json(accounts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAccount = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);
    if (!account) {
      res.status(404).json({ message: "Account not found" });
      return;
    }
    res.status(200).json(account);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const setDefaultAccount = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const userid = req.user?._id;
    const { id } = req.params;
    await Account.updateOne(
      { user: userid, default: true },
      { default: false },
      { new: true }
    );
    const account = await Account.findByIdAndUpdate(
      id,
      { default: true },
      { new: true }
    );
    res.status(200).json({ message: "Account set to Default", account });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteAccount = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const account = await Account.findByIdAndDelete(id);
    if (!account) {
      res.status(404).json({ message: "Account not found" });
      return;
    }
    res.status(200).json({ message: "Account deleted successfully", account });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  addAccount,
  listAccounts,
  getAccount,
  deleteAccount,
  setDefaultAccount,
};
