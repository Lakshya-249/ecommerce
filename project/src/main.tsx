import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductPage from "./product/productPage.tsx";
import Specification from "./product/specification.tsx";
import ShoppingInfo from "./product/shoppingInfo.tsx";
import Review from "./product/review.tsx";
import SellerProfile from "./product/sellerProfile.tsx";
import Home from "./mainPage/home.tsx";
import SearchPage from "./mainPage/searchPage.tsx";
import AddToCart from "./mainPage/addToCart.tsx";
import Account from "./mainPage/account.tsx";
import Login_security from "./mainPage/login_security.tsx";
import Order from "./mainPage/order.tsx";
import OrderDetail from "./mainPage/orderDetail.tsx";
import Addresses from "./mainPage/addresses.tsx";
import AddAdress from "./mainPage/addAdress.tsx";
import CustomerCare from "./mainPage/customerCare.tsx";
import PaymentOption from "./mainPage/paymentOption.tsx";
import AddPaymentMethod from "./mainPage/addPaymentMethod.tsx";
import Signin from "./authentication/mainsignin.tsx";
import Signup from "./authentication/mainsignup.tsx";
import AboutPage from "./BasicComponents/aboutPage.tsx";
import VerificationWindow from "./authentication/verificationWindow.tsx";
import ResetPasswordPage from "./authentication/resetPasswordPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Signin />,
      },
      {
        path: "resetPassword",
        element: <ResetPasswordPage />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "verify",
        element: <VerificationWindow />,
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "searchPage",
        element: <SearchPage />,
      },
      {
        path: "cart",
        element: <AddToCart />,
      },
      {
        path: "account",
        element: <Account />,
        children: [
          {
            path: "login&security",
            element: <Login_security />,
          },
          {
            path: "order",
            element: <Order />,
          },
          {
            path: "orderDetail",
            element: <OrderDetail />,
          },
          {
            path: "address",
            element: <Addresses />,
          },
          {
            path: "addressDetail",
            element: <AddAdress />,
          },
          {
            path: "customerCare",
            element: <CustomerCare />,
          },
          {
            path: "paymentDetails",
            element: <PaymentOption />,
          },
          {
            path: "addPaymentDetails",
            element: <AddPaymentMethod />,
          },
        ],
      },
      {
        path: "productPage",
        element: <ProductPage />,
        children: [
          {
            path: "specifics",
            element: <Specification />,
          },
          {
            path: "shopinfo",
            element: <ShoppingInfo />,
          },
          {
            path: "review",
            element: <Review />,
          },
          {
            path: "sellerinfo",
            element: <SellerProfile />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
