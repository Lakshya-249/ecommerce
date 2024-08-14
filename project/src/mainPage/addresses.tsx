import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { address } from "../utils/schema2";
import { deleteRequest, getRequest, putRequest } from "../utils/handleApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addresses() {
  const navigate = useNavigate();
  const [addresses, setAddress] = useState<address[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest("listAddress");
        console.log(response);
        if (response.err) {
          console.error("API Error:", response.err);
          toast.error(response.err);
          return;
        }
        setAddress(response);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);
  const handleDefault = async (id: string) => {
    try {
      const response = await putRequest(`setDefault/${id}`, {});
      console.log("API Response:", response);

      if (response && response.newAddress) {
        setAddress((prevAddresses) => {
          return prevAddresses.map((address) =>
            address._id?.toString() === id
              ? response.newAddress
              : { ...address, default: false }
          );
        });
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };
  const handleRemove = async (id: string) => {
    await deleteRequest(`address/${id}`);
    setAddress((prevAddresses) => {
      return prevAddresses.filter((a) => a._id?.toString() !== id);
    });
  };

  return (
    <div className="w-full pb-5">
      <ToastContainer />
      <p className="px-6 max-sm:px-0 text-4xl font-semibold">Your Addresses</p>
      <div className="flex flex-wrap p-5 max-sm:p-1">
        <div
          onClick={() => navigate("/account/addressDetail?type=0")}
          className="w-[20rem] h-[17rem] max-sm:w-full max-sm:h-[11rem] rounded-lg flex flex-col 
          max-sm:1 m-2.5 hover:cursor-pointer justify-center items-center border-dashed border-2 border-gray-500"
        >
          <p className="text-7xl font-light text-gray-200">+</p>
          <p className="text-2xl font-semibold">Add Address</p>
        </div>
        {addresses.map((address, i) => (
          <div
            key={i}
            className="w-[20rem] h-[17rem] max-sm:h-auto max-sm:w-auto max-sm:m-1
             max-sm:text-xs flex flex-col m-2.5 justify-between font-light rounded-lg border border-gray-500"
          >
            {address.default ? (
              <div className="px-4 py-3 border-b border-gray-500">
                <p className="text-sm font-semibold text-gray-400">
                  Default Address
                </p>
              </div>
            ) : (
              ""
            )}
            <div className="px-6 py-4 text-sm">
              <p className="font-semibold">{address.name}</p>
              <p>
                {address.addressLine1} , {address.addressLine2}
              </p>
              <p>
                {address.town_city}, {address.state} {address.pincode}
              </p>
              <p>{address.country}</p>
              <p>Phone number: {address.phone}</p>
            </div>
            <div className="flex px-6 py-5 space-x-2">
              <p
                onClick={() =>
                  navigate(`/account/addressDetail?type=1&id=${address._id}`)
                }
                className="text-blue-500 hover:cursor-pointer"
              >
                Edit
              </p>
              <p>|</p>
              <p
                onClick={() => handleRemove(address._id as string)}
                className="text-blue-500 hover:cursor-pointer"
              >
                Remove
              </p>
              {!address.default ? (
                <>
                  <p>|</p>
                  <p
                    onClick={() => handleDefault(address._id as string)}
                    className="text-blue-500 hover:cursor-pointer"
                  >
                    Set Default
                  </p>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Addresses;
