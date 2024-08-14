import { Router } from "express";
import {
  addProduct,
  getProductById,
  getProducts,
  getShoppingInfo,
  getSpecifics,
  searchProduct,
} from "./controllers/product";
import { handleRequest } from "./middleware/logger";
import {
  registerUser,
  updateEmail,
  updateUser,
  verifyUpdatedEmail,
  verifyUser,
} from "./controllers/registerUser";
import {
  forgetPassword,
  getUserDetails,
  handleSendFeedBack,
  loginUser,
  resetPassword,
} from "./controllers/login";
import {
  addAddress,
  deleteAddress,
  getAddress,
  listAddresses,
  setDefaultAddress,
  updatedAddress,
} from "./controllers/address";
import {
  addAccount,
  deleteAccount,
  getAccount,
  listAccounts,
  setDefaultAccount,
} from "./controllers/account";
import {
  addToCart,
  addToWishList,
  getCart,
  getWishList,
  removeFromCart,
  removeFromWishList,
} from "./controllers/cart";
import { addOrder, cancelOrder, getOrders } from "./controllers/order";
import {
  addReview,
  deleteReview,
  getProductReviews,
  updateReview,
} from "./controllers/reviews";

const router = Router();

router.get("/getproductById/:id", getProductById);
router.get("/searchProduct", searchProduct);
router.get("/product", getProducts);
router.post("/product", addProduct);
router.post("/verifyUser", verifyUser);
router.post("/registerUser", registerUser);
router.post("/login", loginUser);
router.post("/forgetPassword", forgetPassword);
router.put("/resetPassword", resetPassword);
router.get("/review/:id", getProductReviews);
router.post("/updateEmail", updateEmail);
router.get("/specifics/:id", getSpecifics);
router.get("/shoppingInfo/:id", getShoppingInfo);

// Protected routes
router.use(handleRequest);

router.get("/userDetails", getUserDetails);
router.post("/sendFeedback", handleSendFeedBack);

router.put("/updateUser", updateUser);
router.post("/verifyUpdatedEmail", verifyUpdatedEmail);

router.post("/address", addAddress);
router.put("/address/:id", updatedAddress);
router.put("/setDefault/:id", setDefaultAddress);
router.get("/address/:id", getAddress);
router.get("/listAddress", listAddresses);
router.delete("/address/:id", deleteAddress);

router.post("/account", addAccount);
router.put("/account/:id", setDefaultAccount);
router.get("/account/:id", getAccount);
router.get("/listAccount", listAccounts);
router.delete("/account/:id", deleteAccount);

router.post("/cart", addToCart);
router.get("/cart", getCart);
router.delete("/cart/:id", removeFromCart);

router.post("/order", addOrder);
router.put("/order/:id", cancelOrder);
router.get("/order", getOrders);

router.post("/review", addReview);
router.put("/review/:id", updateReview);
router.delete("/review/:id", deleteReview);

router.post("/wishlist", addToWishList);
router.get("/wishlist", getWishList);
router.put("/wishlist/:id", removeFromWishList);

export default router;
