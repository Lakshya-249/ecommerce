import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function OrderDetail() {
  const navigate = useNavigate();
  return (
    <div className="w-[75%] max-sm:w-full space-y-3 pb-5 max-sm:text-sm">
      <div className="px-7 pt-8 pb-14 max-sm:px-5 rounded-lg bg-gray-500/10">
        <p className="text-lg font-bold">Delivered Sunday, July 28 at 4:19PM</p>
        <p className="text-gray-300">Be sure to chill any perishables.</p>
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
          <button className="px-5 py-2.5 rounded-xl max-sm:text-xs bg-gray-400/10 hover:bg-gray-400/20 active:bg-black/10">
            Add all items to cart
          </button>
        </div>
      </div>
      <div className="flex space-x-3">
        <div className="bg-gray-500/10 space-y-3.5 rounded-lg w-full p-7">
          <p className="font-bold">Your mobile number</p>
          <div className="flex space-x-2">
            <p className="font-light">+91 99106 40986</p>
            <p
              onClick={() => navigate("/account/login&security")}
              className="text-blue-400 hover:cursor-pointer"
            >
              Edit
            </p>
          </div>
        </div>
        <div className="bg-gray-500/10 overflow-auto space-y-3.5 rounded-lg w-full p-7">
          <div className="flex space-x-3">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="w-[4rem] h-[4rem] max-sm:w-[3rem] max-sm:h-[3rem] bg-white"></div>
              </div>
            ))}
          </div>
          <p>Total items: 3</p>
        </div>
      </div>
      <div className="flex space-x-3">
        <div className="bg-gray-500/10 space-y-3.5 rounded-lg w-full p-7">
          <p>Delivery address</p>
          <div className="text-gray-300 text-sm space-y-1">
            <p>Dhruv Singh</p>
            <p className="text-gray-300 text-sm">
              A-6 Shri Ram Enclave, Maruti Kunj, Road, Bhondsi GURUGRAM, HARYANA
              122101
            </p>
          </div>
        </div>
        <div className="bg-gray-500/10 space-y-3.5 max-sm:text-xs rounded-lg w-full p-7">
          <p>Order summary</p>
          <p className="text-gray-300 text-sm">Order #: 402-0032857-5540321</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Items subtotal (5):</p>
              <p>₹295.12</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery charge:</p>
              <p>₹0.00</p>
            </div>
            <div className="flex justify-between">
              <p>Total before tax:</p>
              <p>₹295.12</p>
            </div>
            <div className="flex justify-between">
              <p>Est. Tax:</p>
              <p>₹6.66</p>
            </div>
            <div className="flex justify-between">
              <p>Items total:</p>
              <p>₹301.78</p>
            </div>
          </div>
          <div className="flex justify-between font-semibold">
            <p>Grand total:</p>
            <p>₹301.78</p>
          </div>
          <p className="font-semibold text-lg max-sm:text-sm border-t pt-2 border-gray-500">
            Payment Methods
          </p>
          <p className="font-light">Pay on Delivery</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
