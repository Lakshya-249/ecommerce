import { Response } from "express";
import { Cart, Order, Product } from "../Models/schemas";
import { CustomRequest } from "../middleware/logger";

const addOrder = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { products, total_amount, address, tax } = req.body;
    const userId = req.user?._id;
    const cartsData = await Cart.find(
      { product: { $in: products } },
      { quantity: 1, product: 1 }
    );
    await Cart.deleteMany({ product: { $in: products }, user: userId });
    const productsavailable = await Product.find({ _id: { $in: products } });
    // console.log(productsavailable);

    for (const productval of productsavailable) {
      for (const cartD of cartsData) {
        if (cartD.product?.toString() === productval._id.toString()) {
          productval.totalOrders += cartD.quantity; // Increment the totalOrders by the quantity in the cart
          await productval.save(); // Save the updated product
          console.log("Product totalOrders updated and saved.");
        }
      }
    }

    const newOrder = new Order({
      products: products,
      total_amount: total_amount,
      tax: tax,
      address: address,
      user: userId,
    });
    await newOrder.save();
    res.status(201).json({ message: "Order placed Successfully", newOrder });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getOrders = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { status } = req.query;
    const order = await Order.find({ user: userId, status: status });
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const cancelOrder = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );
    res.status(200).json({ message: "Order cancelled", order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export { addOrder, cancelOrder, getOrders };
