import React, { useEffect, useState } from "react";
import { address, cart } from "../utils/schema2";
import { getRequest, postRequest } from "../utils/handleApi";
import { useNavigate } from "react-router-dom";

interface PaymentPopProps {
  carts: Array<cart>;
  tax: number;
  totalCost: number;
  isOpen: boolean; // Add this
  onClose: () => void; // Add this
}

function PayementPop({
  carts,
  tax,
  totalCost,
  isOpen,
  onClose,
}: PaymentPopProps) {
  console.log(carts);
  const navigate = useNavigate();
  const [address, setAddress] = useState<address>();
  const [payment_method, setMethod] = useState<string>();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const getAddress = async () => {
    const data = await getRequest(`listAddress?defaultOnly=true`);
    console.log(data);

    setAddress(data);
  };
  useEffect(() => {
    getAddress();
  }, []);

  const handlePayment = async () => {
    const data = await postRequest(`chekout?cost=${totalCost + tax}`, {});
    console.log(data);
  };
  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed p-10 z-50 flex justify-center items-center inset-0 backdrop-blur-sm"
    >
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div className="w-[40%] example max-h-screen overflow-y-auto space-y-5 bg-[#1b1a1a] px-10 py-6 shadow-xl rounded-xl">
        <p className="text-gray-200">Cart / Payement details</p>
        {[...carts].map((m, i) => (
          <div
            key={i}
            className="w-full rounded-xl py-2 px-4 bg-gray-600/10 flex justify-start space-x-5"
          >
            <div className="pt-2.5">
              <div className="w-[5rem] h-[5rem] rounded-xl bg-slate-50">
                {/* <img
                src=""
                alt="Product Image"
                className="w-full h-full object-cover"
              /> */}
              </div>
            </div>
            <div>
              <p>{m.product?.name}</p>
              <p className="text-sm text-gray-300">
                {m.product?.product_type}, {m.product?.product_desc}
              </p>
              <p className="text-sm mt-2 text-gray-200">
                Quantity: {m.quantity}
              </p>
            </div>
          </div>
        ))}
        <div className="bg-gray-600/10 space-y-3.5 max-sm:text-xs rounded-lg w-full py-5 pl-5 pr-10">
          <p> Cost Breakdown</p>
          <p className="text-gray-300 text-sm">
            CartId : #76r7ydwe89ry983wye8r9y
          </p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Items subtotal (6):</p>
              <p>${totalCost}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery charge:</p>
              <p>$10</p>
            </div>
            <div className="flex justify-between">
              <p>Est. Tax:</p>
              <p>${tax}</p>
            </div>
          </div>
          <div className="flex justify-between font-semibold">
            <p>Grand total:</p>
            <p>${10 + tax + totalCost}</p>
          </div>
        </div>
        <div className="bg-gray-600/10 space-y-3.5 rounded-lg w-full py-3 px-4">
          <p>Delivery address</p>
          <div className="text-gray-300 text-sm space-y-1">
            <p>{address?.name}</p>
            <p className="text-gray-300 text-sm">
              {address?.addressLine1}, {address?.addressLine2}{" "}
              {address?.landmark} {address?.state} {address?.pincode} ,{" "}
              {address?.country}
            </p>
          </div>
          <button
            onClick={() => navigate("/account/address")}
            className="bg-gray-500/10 w-[7rem] hover:bg-black active:bg-black/40 rounded-lg p-2"
          >
            Change
          </button>
        </div>
        <div className="bg-gray-600/10 space-y-3.5 rounded-lg w-full py-3 px-4">
          <p className="text-gray-200 font-semibold">Choose Payment Method</p>
          <div className="flex flex-col space-y-3">
            {/* Cash on Delivery Option */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked
                onChange={() => setMethod("Cash on Delivery")}
                className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-gray-200">Cash on Delivery</span>
            </label>

            {/* Pay Online Option */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                onChange={() => setMethod("Online")}
                value="online"
                className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-gray-200">Pay Online</span>
            </label>
          </div>
        </div>
        <div className="w-full space-x-5 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500/10 w-[7rem] hover:bg-black active:bg-black/40 rounded-lg p-2"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            className="bg-gray-200/10 w-[7rem] hover:bg-black active:bg-black/40 rounded-lg p-2"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayementPop;
