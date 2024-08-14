import { useEffect, useState } from "react";
import { contries, states } from "../utils/schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { address } from "../utils/schema2";
import { getRequest, postRequest, putRequest } from "../utils/handleApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddAdress() {
  const navigate = useNavigate();
  const [showBr, setShowBr] = useState<boolean>(false);
  const [showBr2, setShowBr2] = useState<boolean>(false);
  const [country, setCountry] = useState<string>(contries[0]);
  const [state, setState] = useState<string>(states[0]);
  const [address, setAddress] = useState<address>();
  const [defaultAddress, setDefaultAddress] = useState<boolean>(false);
  const [search] = useSearchParams();
  const type = search.get("type");
  const id = search.get("id");
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRequest(`address/${id}`);
      if (data?.err) {
        toast.error("Address not found");
        navigate("/account/address");
      }
      setAddress(data);
    };
    fetchData();
  }, []);
  const handleDefault = async () => {
    setAddress({ ...address, default: !defaultAddress });
    setDefaultAddress(!defaultAddress);
  };
  const handleBr = () => {
    setShowBr(!showBr);
  };
  const handleBr2 = () => {
    setShowBr2(!showBr2);
  };
  const toggleOrder = (index: number) => {
    setShowBr(!showBr);
    setCountry(contries[index]);
    setAddress({ ...address, country: contries[index] });
  };
  const toggleOrder2 = (index: number) => {
    setShowBr2(!showBr2);
    setState(states[index]);
    setAddress({ ...address, state: states[index] });
  };
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: string
  ) => {
    setAddress({ ...address, [val]: e.target.value });
  };
  const handleSubmit = async () => {
    toast("Processing request...");
    const data =
      type === "0"
        ? await postRequest("address", address)
        : await putRequest(`address/${id}`, address as Object);
    if (!data.err) {
      toast.success(data.message);
      navigate("/account/address");
    } else {
      toast.error(data.err);
    }
    if (defaultAddress) {
      await putRequest(`setDefault/${id}`, {});
    }
  };
  return (
    <div className="w-[55%] max-sm:w-full space-y-5 pb-5">
      <ToastContainer />
      <p className="text-4xl font-semibold">
        {type == "0" ? "Add Address" : "Edit Address"}
      </p>
      <div
        className="px-7 py-5 flex bg-gray-400/10 
      rounded-xl justify-between items-center"
      >
        <p>Save default. Save this loaction as default.</p>
        <button
          className="px-5 py-2 rounded-xl bg-gray-600/10 
      hover:bg-gray-500/20 active:bg-black/10 text-sm font-semibold"
        >
          Autofill
        </button>
      </div>
      <div className="w-full space-y-3">
        <p>Country/Region</p>
        <div
          onClick={handleBr}
          className="relative bg-gray-400/10 flex items-center 
          hover:cursor-pointer justify-between px-5 py-2 rounded-xl"
        >
          <p>{address?.country !== undefined ? address.country : country}</p>
          <FontAwesomeIcon icon={showBr ? faChevronUp : faChevronDown} />
          {showBr ? (
            <div
              className="absolute font-light backdrop-blur-md overflow-auto roun top-11 
            right-0 min-w-fit w-full max-h-[20rem] rounded-xl space-y-3 bg-gray-400/10 p-3"
            >
              {contries.map((val, i) => (
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
        <p>Full name (First and Last name)</p>
        <input
          onChange={(e) => handleAddressChange(e, "name")}
          value={address?.name}
          type="text"
          className="w-full px-5 py-2 rounded-lg border bg-inherit border-gray-500"
        />
        <p>Mobile number</p>
        <input
          onChange={(e) => handleAddressChange(e, "phone")}
          value={address?.phone}
          type="text"
          className="w-full px-5 py-2 rounded-lg border bg-inherit border-gray-500"
        />
        <p>Pincode</p>
        <input
          onChange={(e) => handleAddressChange(e, "pincode")}
          value={address?.pincode}
          type="text"
          className="w-full px-5 py-2 rounded-lg border bg-inherit border-gray-500"
        />
        <p>Flat, House no., Building, Company, Apartment</p>
        <input
          onChange={(e) => handleAddressChange(e, "addressLine1")}
          value={address?.addressLine1}
          type="text"
          className="w-full px-5 py-2 rounded-lg border bg-inherit border-gray-500"
        />
        <p>Area, Street, Sector, Village</p>
        <input
          onChange={(e) => handleAddressChange(e, "addressLine2")}
          value={address?.addressLine2}
          type="text"
          className="w-full px-5 py-2 rounded-lg border bg-inherit border-gray-500"
        />
        <p>Landmark</p>
        <input
          onChange={(e) => handleAddressChange(e, "landmark")}
          value={address?.landmark}
          type="text"
          className="w-full px-5 py-2 rounded-lg border bg-inherit border-gray-500"
        />
        <div className="flex space-x-3">
          <div className="space-y-1 w-full">
            <p>Town/City</p>
            <input
              onChange={(e) => handleAddressChange(e, "town_city")}
              value={address?.town_city}
              type="text"
              className="w-full px-5 py-2 rounded-lg border bg-inherit border-gray-500"
            />
          </div>
          <div className="w-full space-y-1">
            <p>State</p>
            <div
              onClick={handleBr2}
              className="relative w-full bg-gray-400/10 flex items-center 
          hover:cursor-pointer justify-between px-5 py-2 rounded-xl"
            >
              <p>{address?.state !== undefined ? address.state : state}</p>
              <FontAwesomeIcon icon={showBr2 ? faChevronUp : faChevronDown} />
              {showBr2 ? (
                <div
                  className="absolute font-light backdrop-blur-md overflow-auto example roun top-12 
            left-0 w-full min-w-fit max-h-[20rem] rounded-lg space-y-3 bg-gray-400/10 p-3"
                >
                  {states.map((val, i) => (
                    <p
                      onClick={() => toggleOrder2(i)}
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
          </div>
        </div>
        <div className="w-full py-4">
          <label className="flex space-x-2 hover:cursor-pointer">
            <input type="checkbox" onChange={handleDefault} />
            <p>Save this as default address for deliveries</p>
          </label>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="px-10 py-2 rounded-xl bg-gray-400/10 
      hover:bg-gray-400/20 active:bg-black/10"
      >
        Add address
      </button>
    </div>
  );
}

export default AddAdress;
