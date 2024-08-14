import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import img from "../assets/visa-svgrepo-com.svg";
import img2 from "../assets/mastercard-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { account } from "../utils/schema2";
import { deleteRequest, getRequest, putRequest } from "../utils/handleApi";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function PaymentOption() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<account[]>([]);
  useEffect(() => {
    const fetchdata = async () => {
      const data = await getRequest("listAccount");
      if (data?.err) {
        console.log(data.err);
        toast.error(data.err);
        return;
      }
      setAccounts(data);
    };
    fetchdata();
  }, [accounts]);
  const handleDefault = async (id: string) => {
    const naccount = await putRequest(`account/${id}`, {});
    if (naccount?.err) {
      console.log(naccount.err);
      toast.error(naccount.err);
      return;
    }
    toast.success(naccount.message);
    setAccounts((account) => {
      return account.map((a) => {
        if (a._id === id) {
          return { ...a, default: true };
        }
        return a;
      });
    });
  };
  const handleRemove = async (id: string) => {
    const naccount = await deleteRequest(`account/${id}`);
    if (naccount?.err) {
      console.log(naccount.err);
      toast.error(naccount.err);
      return;
    }
    toast.success(naccount.message);
    setAccounts((account) => account.filter((a) => a._id !== id));
  };
  return (
    <div className="w-[50%] max-sm:w-full pb-5 space-y-7">
      <ToastContainer />
      <p className="text-4xl font-semibold">Payement Details</p>
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-3 text-2xl font-bold text-gray-200 items-center">
          <FontAwesomeIcon icon={faCreditCard} />
          <p>Credit Card(s)</p>
        </div>
        <p className="text-gray-300">Manage your card and payment options</p>
      </div>
      <div>
        <button
          onClick={() => navigate("/account/addPaymentDetails")}
          className="px-8 font-semibold py-2 rounded-xl 
          bg-gray-400/10 hover:bg-gray-400/15 active:bg-black"
        >
          Add new card
        </button>
      </div>
      <div className="space-y-5">
        {accounts.map((account, i) => (
          <div
            key={i}
            className="rounded-xl py-3 px-4 border border-gray-600 flex justify-between"
          >
            <div className="space-x-4 flex">
              <div className="rounded-xl w-[4rem] h-[3rem] flex items-center border p-1 border-gray-600">
                <img src={i > 1 ? img : img2} className="object-contain" />
              </div>
              <div>
                <p className="text-lg max-sm:text-base">
                  Visa ending {account.card_number?.slice(12)}
                </p>
                <p className="text-gray-400 text-sm">
                  Exp. date {account.expiry}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-4 py-1 px-3">
                {account.default ? (
                  <button
                    className="px-4 py-2 font-semibold text-gray-300 active:bg-black/5
                   text-sm rounded-xl bg-gray-500/10 hover:bg-gray-400/20"
                  >
                    Default
                  </button>
                ) : (
                  <p
                    onClick={() => handleDefault(account._id as string)}
                    className="text-blue-500 hover:cursor-pointer max-sm:text-sm"
                  >
                    Set as default
                  </p>
                )}

                <FontAwesomeIcon
                  onClick={() => handleRemove(account._id as string)}
                  icon={faTrashCan}
                  color="gray"
                  className="hover:text-red-400 hover:cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentOption;
