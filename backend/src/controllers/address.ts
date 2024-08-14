import { CustomRequest } from "../middleware/logger";
import { User, Address } from "../Models/schemas";
import { Response } from "express";

const addAddress = async (req: CustomRequest, res: Response): Promise<void> => {
  const {
    name,
    phone,
    addressLine1,
    addressLine2,
    landmark,
    town_city,
    state,
    pincode,
    country,
  } = req.body;

  const id = req.user?._id;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (
      !name ||
      !phone ||
      !addressLine1 ||
      !addressLine2 ||
      !landmark ||
      !town_city ||
      !state ||
      !pincode ||
      !country
    ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const newAddress = new Address({ ...req.body, user: id });
    await newAddress.save();
    user.addresses.push(newAddress._id);
    await user.save();
    res.json({ message: "Address added succesfully", newAddress });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const updatedAddress = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const body = req.body;
    if (!body) {
      res.status(400).json({ message: "No data found to update" });
      return;
    }
    const updatedAddress = await Address.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedAddress) {
      res.status(404).json({ message: "Address not found" });
      return;
    }
    res
      .status(200)
      .json({ updatedAddress, message: "Address updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const listAddresses = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.user?._id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const addresses = await Address.find({ user: id });
    res.json(addresses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAddress = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);
    if (!address) {
      res.status(404).json({ message: "Address not found" });
      return;
    }
    res.json(address);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const setDefaultAddress = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const userid = req.user?._id;
    const { id } = req.params;
    await Address.updateOne(
      { user: userid, default: true },
      {
        $set: { default: false },
      }
    );
    const newAddress = await Address.findByIdAndUpdate(
      id,
      { default: true },
      { new: true }
    );
    res.status(200).json({ message: "Address set to default", newAddress });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteAddress = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const address = await Address.findByIdAndDelete(id);
    if (!address) {
      res.status(404).json({ message: "Address not found" });
      return;
    }
    res.json({ message: "Address deleted successfully", address });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  addAddress,
  updatedAddress,
  deleteAddress,
  listAddresses,
  getAddress,
  setDefaultAddress,
};
