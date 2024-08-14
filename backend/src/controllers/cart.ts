import { Response } from "express";
import { CustomRequest } from "../middleware/logger";
import { Cart, User } from "../Models/schemas";
import { Types } from "mongoose";

const addToCart = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const id = req.user?._id;
    const { productId, quantity } = req.body;
    const cartavailable = await Cart.findOne({ user: id, product: productId });
    if (cartavailable) {
      res.status(200).json({ message: "Already available in cart" });
      return;
    }
    const cart = new Cart({
      user: id,
      product: productId,
      quantity: quantity,
    });
    await cart.save();
    res.status(200).json({
      message: "Product added to cart successfully",
      data: cart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const removeFromCart = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }
    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getCart = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const id = req.user?._id;
    const cart = await Cart.find({ user: id }).populate({
      path: "product",
      populate: [
        { path: "colors", options: { limit: 1 } },
        {
          path: "reviews",
        },
      ],
    });
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const addToWishList = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.user?._id;
    const { productId } = req.body;
    const user = await User.findById(id);
    const val = user?.wishlist.find((ws) => ws._id.toString() === productId);
    if (val) {
      res.status(200).json({ message: "Already available in wishlist" });
      return;
    }
    user?.wishlist.push(productId);
    await user?.save();
    res.status(200).json({ message: "Product added to wishlist successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const removeFromWishList = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const idAsObjectId = new Types.ObjectId(id);
    await User.findByIdAndUpdate(
      req.user?._id,
      { $pull: { wishlist: idAsObjectId } },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Product removed from wishlist successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getWishList = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.user?._id;
    const user = await User.findById(id).populate({
      path: "wishlist",
      populate: {
        path: "colors",
        options: { limit: 1 },
      },
    });
    res
      .status(200)
      .json({ message: "Wishlist fetched successfully", data: user?.wishlist });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  addToCart,
  removeFromCart,
  getCart,
  addToWishList,
  removeFromWishList,
  getWishList,
};
