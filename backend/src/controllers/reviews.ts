import { Response } from "express";
import { Product, Review, User } from "../Models/schemas";
import { CustomRequest } from "../middleware/logger";

const addReview = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user?._id;
    const review = new Review({
      user: userId,
      product: productId,
      rating: rating,
      comment: comment,
    });
    await review.save();
    const product = await Product.findById(productId);
    product?.reviews.push(review._id);
    await product?.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductReviews = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ product: id }).populate("user");
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateReview = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const userid = req.user?._id;
    const { id } = req.params;
    const { rating, comment } = req.body;
    const filter = {
      _id: id,
      user: userid,
    };
    const update = {
      rating: rating,
      comment: comment,
    };
    const updateReview = await Review.updateOne(filter, update);
    if (updateReview.modifiedCount === 0) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Data updated successfully", updateReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteReview = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const userid = req.user?._id;
    const { id } = req.params;
    const deleteReview = await Review.deleteOne({
      _id: id,
      user: userid,
    });
    if (deleteReview.deletedCount === 0) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addReview, getProductReviews, updateReview, deleteReview };
