import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Order() {
  const navigate = useNavigate();
  const [showBr, setBr] = useState<boolean>(false);
  const handleToggle = () => {
    setBr(!showBr);
  };
  const orders: Array<string> = [
    "Orders",
    "Not yet shipped",
    "Cancelled Orders",
  ];
  const [order, setOrder] = useState<string>(orders[0]);
  const toggleOrder = (val: number) => {
    setOrder(orders[val]);
    handleToggle();
  };
  return (
    <div className="w-full space-y-7 pb-5">
      <div
        onClick={handleToggle}
        className="relative py-2 inline-flex items-center hover:cursor-pointer
        space-x-3.5 rounded-xl px-5 border border-gray-500"
      >
        <p>{order}</p>
        <FontAwesomeIcon icon={showBr ? faChevronUp : faChevronDown} />
        {showBr ? (
          <div className="absolute backdrop-blur-md top-11 right-0 min-w-fit w-full rounded-xl space-y-3 bg-gray-400/10 p-3">
            {orders.map((val, i) => (
              <p
                onClick={() => toggleOrder(i)}
                className=" text-nowrap"
                key={i}
              >
                {val}
              </p>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-[70%] max-sm:w-full rounded-lg border overflow-hidden border-gray-500"
        >
          <div className="w-full text-sm max-sm:text-xs text-gray-300 bg-gray-400/5 py-3 px-5 flex items-center justify-between">
            <div className="flex space-x-10">
              <div>
                <p>ORDER PLACED</p>
                <p className="text-gray-400">20-04-2024</p>
              </div>
              <div>
                <p>TOTAL</p>
                <p className="text-gray-400">$500.78</p>
              </div>
              <div>
                <p>SHIP TO</p>
                <p className="hover:cursor-pointer text-gray-400 hover:text-blue-400">
                  Dhruv Singh <FontAwesomeIcon icon={faChevronDown} />
                </p>
              </div>
            </div>
            <p className="max-sm:hidden">ORDER_ID#1330u38233274236125tr662</p>
          </div>
          <div className="border-t border-gray-500 px-5 max-sm:px-3.5 pt-5 pb-2">
            <div className="flex justify-between flex-wrap">
              <p className="text-lg">Delivered 28 July</p>
              <button
                onClick={() => navigate("/account/orderDetail")}
                className={`py-2.5 px-5 rounded-xl 
                    ${
                      order.trim() === "Not yet shipped"
                        ? "bg-black/10"
                        : "bg-gray-500/10"
                    }
            hover:bg-gray-500/20 active:bg-black/10 max-sm:text-xs`}
              >
                {order.trim() !== "Not yet shipped"
                  ? "View Order"
                  : "Track or view order"}
              </button>
            </div>
            <div className="flex pt-3 space-x-5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-[4rem] h-[4rem] bg-white"></div>
              ))}
            </div>
          </div>
          <div className="px-5 py-3">
            <p>Total Items: 3</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Order;
