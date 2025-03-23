import { Response, Request } from "express";
import { Cart, Order, Product } from "../Models/schemas";
import { CustomRequest } from "../middleware/logger";
import { Document, ObjectId } from "mongoose";
import { loadEnvFile } from "process";
import Razorpay from "razorpay";
loadEnvFile();
var instance = new Razorpay({
  key_id: process.env.KEY_ID_RAZORPAY || "",
  key_secret: process.env.KEY_SECRET_RAZORPAY || "",
});

interface ProductP extends Document {
  _id: ObjectId;
  category: ObjectId;
  totalOrders: number;
  brand: string;
  name: string;
  product_desc: string;
  product_type: string;
  amount: number;
  tax: number;
  size: string[];
  colors: ObjectId[];
  reviews: ObjectId[];
  specifics: ObjectId;
  shoppingInfo: ObjectId;
}

// Interface for the Cart schema
// interface CartP extends Document {
//   user: ObjectId;
//   product: ProductP | ObjectId;
//   quantity: number;
//   color?: string;
//   size?: number;
//   discount?: number;
// }

const chekOutOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cost } = req.query;
    if (!cost) {
      res.status(400).json({ message: "Cost is required" });
      return;
    }
    var options = {
      amount: parseInt(cost as string), // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    console.log(order, "\n");
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const addOrder = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { products, address, payment_method, payment_status } = req.body;
    const userId = req.user?._id;
    const cartsData = await Cart.find({ _id: { $in: products } })
      .populate("product")
      .exec();
    await Cart.deleteMany({ _id: { $in: products } });
    const productsavailable = await Product.find({ _id: { $in: products } });
    // console.log(productsavailable);
    // console.log(cartsData);

    for (const productVal of productsavailable) {
      for (const cartD of cartsData) {
        const populatedProduct = cartD.product as unknown as ProductP;

        if (populatedProduct._id.toString() === productVal._id.toString()) {
          productVal.totalOrders += cartD.quantity; // Increment the totalOrders by the quantity in the cart
          await productVal.save(); // Save the updated product
          console.log("Product totalOrders updated and saved.");
        }
      }
    }

    const newOrder = await Order.insertMany(
      cartsData.map((cartD) => {
        if (cartD.product === undefined || cartD.product === null) return;
        const populatedProduct = cartD.product as unknown as ProductP;
        return {
          product: cartD.product,
          quantity: cartD.quantity,
          user: userId,
          total_amount: cartD.quantity * populatedProduct.amount,
          tax: populatedProduct.tax * cartD.quantity,
          orderDate: new Date(),
          status: "Pending",
          color: cartD.color || "",
          discount: cartD.discount || 0,
          size: cartD.size || "",
          address,
          payment_method,
          payment_status,
        };
      })
    );
    console.log(newOrder);

    res.status(201).json({ message: "Order placed Successfully", newOrder });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getOrders = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { status, detail, id } = req.query;

    // Define valid status values
    const validStatuses = ["Pending", "Delivered", "Cancelled"];

    // Check if status is provided and is valid
    const query: any = { user: userId };
    if (status && validStatuses.includes(status as string)) {
      query.status = status;
    }
    let orders;

    // Fetch orders with optional status filter and populate related fields
    if (detail === undefined) {
      orders = await Order.find(query).populate([
        { path: "product", select: "name product_desc product_type amount" },
        { path: "address", select: "name" },
      ]);
    } else {
      if (!id) {
        res.status(404).json({ message: "please select a product" });
        return;
      }
      orders = await Order.findById(id).populate([
        { path: "product" },
        { path: "address" },
      ]);
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
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

export { addOrder, cancelOrder, getOrders, chekOutOrder };
