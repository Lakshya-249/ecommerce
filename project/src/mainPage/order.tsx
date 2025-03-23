import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../utils/handleApi";
import { inventory_order } from "../utils/schema2";

function Order() {
  const navigate = useNavigate();
  const [showBr, setBr] = useState<boolean>(false);
  const handleToggle = () => {
    setBr(!showBr);
  };
  const [inventory, setinventory] = useState<Array<inventory_order>>([]);
  const orders: Array<string> = ["Delivered", "Pending", "Cancelled"];
  const [order, setOrder] = useState<string>(orders[0]);
  const [msg, setMsg] = useState<string>("");
  useEffect(() => {
    const fetch = async () => {
      const data = await getRequest(`order?status=${order}`);
      console.log(data);
      if (!data.err) {
        setinventory([...data]);
      } else setinventory([]);

      if (!data.length) {
        if (order === "Delivered") setMsg("No orders found for this status");
        else if (order === "Pending") setMsg("No pending orders found");
        else setMsg("No Cancelled orders found");
      } else {
        setMsg("");
      }
    };
    fetch();
  }, [order]);
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
      {inventory.map((item, i) => (
        <div
          key={i}
          className="w-[70%] max-sm:w-full rounded-lg shadow-2xl overflow-hidden"
        >
          <div className="w-full text-sm max-sm:text-xs text-gray-300 bg-gray-400/5 py-3 px-5 flex items-center justify-between">
            <div className="flex space-x-10">
              <div>
                <p>ORDER PLACED</p>
                <p className="text-gray-400">
                  {item?.order_date.split("T")[0]}
                </p>
              </div>
              <div>
                <p>TOTAL</p>
                <p className="text-gray-400">$ {item?.total_amount}</p>
              </div>
              <div>
                <p>SHIP TO</p>
                <p className="hover:cursor-pointer text-gray-400 hover:text-blue-400">
                  {item?.address?.name} <FontAwesomeIcon icon={faChevronDown} />
                </p>
              </div>
            </div>
            <p className="max-sm:hidden">ORDER_ID#{item?._id}</p>
          </div>
          <div className=" px-5 max-sm:px-3.5 pt-5 pb-2">
            <div className="flex justify-between flex-wrap">
              <p className="text-lg">
                {order.trim() === "Pending"
                  ? "Delivery in process"
                  : `Delivered on 28 July`}
              </p>
              <button
                onClick={() =>
                  navigate(
                    `/account/orderDetail?status=${order}&detail=123&id=${item._id}`
                  )
                }
                className={`py-2.5 px-5 rounded-xl 
                    ${
                      order.trim() === "Not yet shipped"
                        ? "bg-black/10"
                        : "bg-gray-500/10"
                    }
            hover:bg-gray-500/20 active:bg-black/10 max-sm:text-xs`}
              >
                {order.trim() !== "Pending"
                  ? "View Order"
                  : "Track or view order"}
              </button>
            </div>
            <div className="flex pt-3 space-x-5">
              <div key={i} className="w-[5rem] rounded-xl bg-white"></div>
              <div>
                <p>{item?.product?.name}</p>
                <p className="text-sm truncate text-gray-400">
                  {item?.product?.product_type}, {item?.product?.product_desc}
                </p>
                <p className="pt-3">$ {item?.product?.amount}</p>
              </div>
            </div>
          </div>
          <div className="px-5 py-3">
            <p>Total Items: {item?.quantity}</p>
          </div>
        </div>
      ))}
      {msg && <p className="text-sm text-gray-400">{msg}</p>}
    </div>
  );
}

export default Order;
