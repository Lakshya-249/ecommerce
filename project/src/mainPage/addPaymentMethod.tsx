import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img1 from "../assets/visa-svgrepo-com.svg";
import img2 from "../assets/mastercard-svgrepo-com.svg";
import img3 from "../assets/american-express-svgrepo-com.svg";
import { useState } from "react";
import { account } from "../utils/schema2";
import { postRequest, putRequest } from "../utils/handleApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddPaymentMethod() {
  const navigate = useNavigate();
  const [account, setAccount] = useState<account>();
  const [defaultAccount, setDefaultAccount] = useState<boolean>(false);
  const handleAccount = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: string
  ) => {
    setAccount({ ...account, [val]: e.target.value });
  };
  const handleDefault = () => {
    setAccount({ ...account, ["default"]: !defaultAccount });
    setDefaultAccount(!defaultAccount);
  };
  const handleSubmit = async () => {
    toast("Processing request...");
    const newaccount = await postRequest("account", account);
    if (newaccount?.err) {
      toast.error(newaccount.err);
    } else {
      toast.success(newaccount.message);
      navigate("/account/paymentDetails");
    }
    if (defaultAccount) {
      await putRequest(`account/${newaccount._id}`, {});
    }
  };
  return (
    <div className="pb-5 space-y-5 w-[50%] max-sm:w-full">
      <ToastContainer />
      <p className="text-4xl font-semibold">Payment</p>
      <div
        className="w-[10rem] h-[5rem] space-y-1 text-gray-200 rounded-lg border 
      border-gray-400 py-4 px-5"
      >
        <FontAwesomeIcon icon={faCreditCard} />
        <p className="text-sm font-semibold">Card</p>
      </div>
      <div className="space-y-2">
        <p>Card number</p>
        <div className="flex w-full px-3 rounded-lg bg-gray-400/10">
          <input
            onChange={(e) => handleAccount(e, "card_number")}
            type="text"
            className="bg-transparent pl-2 w-full outline-none"
            placeholder="1234 1234 1234 1234"
          />
          <div className="items-center space-x-1 flex">
            <div className="rounded-xl w-[4rem] h-[3rem] max-sm:w-[3rem] flex items-center">
              <img src={img1} className="object-contain" />
            </div>
            <div className="rounded-xl w-[4rem] h-[3rem] max-sm:w-[3rem] flex items-center">
              <img src={img2} className="object-contain" />
            </div>
            <div className="rounded-xl w-[3rem] h-[2rem] max-sm:w-[2rem] flex items-center">
              <img src={img3} className="object-contain" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-5">
        <div className="w-full space-y-2">
          <p>Expiry</p>
          <input
            onChange={(e) => handleAccount(e, "expiry")}
            type="text"
            className="bg-gray-400/10 w-full outline-none px-5 py-2 rounded-lg"
            placeholder="MM / YY"
          />
        </div>
        <div className="w-full space-y-2">
          <p>CVV</p>
          <div className="bg-gray-400/10 w-full flex items-center px-5 py-2 rounded-lg">
            <input
              onChange={(e) => handleAccount(e, "cvv")}
              type="text"
              className="outline-none bg-transparent w-full"
              placeholder="CVC"
            />
            <FontAwesomeIcon icon={faCreditCard} color="white" />
          </div>
        </div>
      </div>
      <label className="flex space-x-2 py-5 hover:cursor-pointer items-start">
        <input onClick={handleDefault} type="checkbox" className="mt-1" />
        <p className="text-sm text-gray-400">
          By clicking on this you set this account to default for transactions
        </p>
      </label>
      <div className="flex space-x-3">
        <button
          onClick={() => navigate("/account/paymentDetails")}
          className="px-10 py-2 border border-gray-500 
        hover:bg-gray-500/10 active:bg-gray-500/20 rounded-xl"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-12 py-2 font-semibold bg-gray-500/10 rounded-xl 
        hover:bg-gray-500/20 active:bg-gray-500/30"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddPaymentMethod;
