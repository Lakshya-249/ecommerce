import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const productSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  totalOrders: { type: Number, default: 0 },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  product_desc: { type: String, required: true },
  product_type: { type: String, required: true },
  amount: { type: Number, required: true },
  tax: { type: Number, required: true },
  size: { type: Array<String> },
  colors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Color" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  specifics: { type: mongoose.Schema.Types.ObjectId, ref: "Specifics" },
  shoppingInfo: { type: mongoose.Schema.Types.ObjectId, ref: "ShoppingInfo" },
});

const colorSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true },
  hex: { type: String },
  images: { type: Array<String> },
});

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
});

const specificsSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  details: { type: Array<String>, required: true },
});

const shoppingInfoSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  info: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  additionalInfo: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, required: true },
  landmark: { type: String, required: true },
  town_city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true },
  default: { type: Boolean, default: false },
});

const accountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  card_number: { type: String, required: true },
  expiry: { type: String, required: true },
  cvv: { type: String, required: true },
  default: { type: Boolean, default: false },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  total_amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Delivered", "Cancelled"],
    default: "Pending",
  },
  tax: { type: Number, required: true },
  order_date: { type: Date, default: Date.now },
  delivery_date: { type: Date },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
  discount: { type: Number },
});

const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);
const Color = mongoose.model("Color", colorSchema);
const Review = mongoose.model("Review", reviewSchema);
const Specifics = mongoose.model("Specifics", specificsSchema);
const ShoppingInfo = mongoose.model("ShoppingInfo", shoppingInfoSchema);
const User = mongoose.model("User", userSchema);
const Address = mongoose.model("Address", addressSchema);
const Account = mongoose.model("Account", accountSchema);
const Order = mongoose.model("Order", orderSchema);
const Cart = mongoose.model("Cart", cartSchema);

export {
  Category,
  Product,
  Color,
  Review,
  Specifics,
  ShoppingInfo,
  User,
  Address,
  Account,
  Order,
  Cart,
};
