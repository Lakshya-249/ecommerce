import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { inventory_orderDetails } from "../utils/schema2";
import { getRequest, postRequest } from "../utils/handleApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../utils/authentication";

function OrderDetail() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<inventory_orderDetails>();
  const search = useLocation();
  function getDayOfWeek(dateString: string) {
    if (dateString === undefined || dateString === "") {
      return "";
    }
    const date = new Date(dateString);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }
  const addToCart = async () => {
    if (getToken() === "") {
      toast.error("You need to be logged in to add to cart");
      return;
    }
    const data = await postRequest("cart", {
      productId: order?.product?._id,
      quantity: order?.quantity,
      color: order?.color,
      size: order?.size,
    });
    console.log(data);

    if (!data.err) {
      toast.success(data.message);
    } else {
      toast.error(data.err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest(`order${search.search}`);
        if (response.err) {
          console.error("API Error:", response.err);
          toast.error(response.err);
        } else {
          setOrder(response);
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-[75%] max-sm:w-full space-y-3 pb-5 max-sm:text-sm">
      <ToastContainer />
      <div className="px-7 pt-8 pb-14 max-sm:px-5 rounded-lg bg-gray-500/10">
        <p className="text-lg font-bold">
          {order?.status} {getDayOfWeek(order?.delivery_date || "")},{" "}
          {order?.delivery_date?.split("T")[0]}{" "}
          {order?.delivery_date?.split("T")[1].split(".")[0]}
        </p>
        <p className="text-gray-300">
          {order?.status === "Pending"
            ? "Your order is being processed"
            : "Your order has been delivered"}
        </p>
        <div className="relative text-nowrap text-sm max-sm:text-xs flex justify-between items-center bg-gray-400 rounded-full h-[0.5rem] mt-7">
          <div className="absolute w-[33%] bg-sky-400 inset-0 rounded-full"></div>
          <div className="relative w-[1.5rem] h-[1.5rem] flex items-center z-20 justify-center rounded-full bg-sky-400">
            <FontAwesomeIcon icon={faCheck} />
            <p className="absolute top-8">Ordered</p>
          </div>
          <div className="relative w-[1.5rem] h-[1.5rem] flex items-center z-20 justify-center rounded-full bg-gray-400">
            <FontAwesomeIcon icon={faCheck} />
            <p className="absolute top-8">Ready for dipatch</p>
          </div>
          <div className="relative w-[1.5rem] h-[1.5rem] flex items-center z-20 justify-center rounded-full bg-gray-400">
            <FontAwesomeIcon icon={faCheck} />
            <p className="absolute top-8">Out for delivery</p>
          </div>
          <div className="relative w-[1.5rem] h-[1.5rem] flex items-center z-20 justify-center rounded-full bg-gray-400">
            <FontAwesomeIcon icon={faCheck} />
            <p className="absolute top-8 font-semibold">Delivered</p>
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <div className="bg-gray-500/10 space-y-3.5 rounded-lg w-full p-7">
          <p>Need help with this order?</p>
          <p
            onClick={() => navigate("/account/customerCare")}
            className="text-gray-300 text-sm hover:text-blue-400 hover:cursor-pointer"
          >
            Contact Customer Service
          </p>
        </div>
        <div className="bg-gray-500/10 space-y-3.5 rounded-lg w-full p-7">
          <p>Do you want to buy these items again?</p>
          <button
            onClick={addToCart}
            className="px-5 py-2.5 rounded-xl max-sm:text-xs bg-gray-400/10 hover:bg-gray-400/20 active:bg-black/10"
          >
            Add all items to cart
          </button>
        </div>
      </div>
      <div className="flex space-x-3">
        <div className="bg-gray-500/10 space-y-3.5 rounded-lg w-full p-7">
          <p className="font-bold">Your mobile number</p>
          <div className="flex space-x-2">
            <p className="font-light">+91 {order?.address?.phone}</p>
          </div>
        </div>
        <div className="bg-gray-500/10 overflow-auto space-y-3.5 rounded-lg w-full p-7">
          <div className="flex space-x-3">
            <div>
              <div className="w-[4rem] h-[4rem] max-sm:w-[3rem] max-sm:h-[3rem] rounded-md bg-white"></div>
            </div>
            <div>
              <p className="text-sm">{order?.product?.name}</p>
              <p className="text-sm">
                {order?.product?.product_type} {order?.product?.product_desc}
              </p>
            </div>
          </div>
          <p>Total items: {order?.quantity}</p>
        </div>
      </div>
      <div className="flex space-x-3">
        <div className="bg-gray-500/10 space-y-3.5 rounded-lg w-full p-7">
          <p>Delivery address</p>
          <div className="text-gray-300 text-sm space-y-1">
            <p>{order?.address?.name} </p>
            <p className="text-gray-300 text-sm">
              {order?.address?.addressLine1}, {order?.address?.addressLine2}
            </p>
          </div>
        </div>
        <div className="bg-gray-500/10 space-y-3.5 max-sm:text-xs rounded-lg w-full p-7">
          <p>Order summary</p>
          <p className="text-gray-300 text-sm">OrderId : #{order?._id}</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Items subtotal ({order?.quantity}):</p>
              <p>$ {order?.product?.amount}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery charge:</p>
              <p>$ 10</p>
            </div>
            <div className="flex justify-between">
              <p>Total before tax:</p>
              <p>$ {order?.total_amount}</p>
            </div>
            <div className="flex justify-between">
              <p>Est. Tax:</p>
              <p>$ {order?.tax}</p>
            </div>
            <div className="flex justify-between">
              <p>Items total:</p>
              <p>$ {order?.total_amount}</p>
            </div>
          </div>
          <div className="flex justify-between font-semibold">
            <p>Grand total:</p>
            <p>$ {(order?.tax || 0) + (order?.total_amount || 0)}</p>
          </div>
          <p className="font-semibold text-lg max-sm:text-sm border-t pt-2 border-gray-500">
            Payment Methods
          </p>
          <p className="font-light">
            {order?.payment_method}, {order?.payment_status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
