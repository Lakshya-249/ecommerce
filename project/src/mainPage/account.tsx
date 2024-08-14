import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const valueText: Array<string> = [
    "Login & security",
    "Your orders",
    "Your Addresses",
    "Customer care",
    "Payment options",
  ];
  const [showBr, setBr] = useState<boolean>(false);
  const [textval, setText] = useState<String>(valueText[0]);
  const handleToggle = () => {
    setBr(!showBr);
  };

  const handleTextChange = (newText: string) => {
    handleToggle();
    setText(newText);
    if (newText === "Login & security") navigate("/account/login&security");
    else if (newText === "Your orders") navigate("/account/order");
    else if (newText === "Your Addresses") navigate("/account/address");
    else if (newText === "Customer care") navigate("/account/customerCare");
    else if (newText === "Payment options") navigate("/account/paymentDetails");
  };

  return (
    <div className="w-full h-screen flex text-left max-sm:flex-col text-white pt-24 max-sm:pt-16 max-sm:space-y-4">
      <div
        className="w-[25%] max-sm:w-full py-3 h-full max-sm:items-start
      max-sm:h-auto px-10 flex flex-col items-center max-sm:px-5"
      >
        <div
          onClick={handleToggle}
          className="relative text-nowrap max-sm:flex hover:cursor-pointer hidden space-x-5 border 
          border-gray-500 items-center px-5 py-2 rounded-xl"
        >
          <p>{textval}</p>
          <FontAwesomeIcon icon={showBr ? faChevronUp : faChevronDown} />
          {showBr ? (
            <div
              className="absolute z-30 hover:cursor-pointer w-full top-11 right-0 rounded-lg 
            bg-gray-400/10 backdrop-blur-md px-4 py-3 space-y-3 flex flex-col"
            >
              {valueText.map((val, i) => (
                <p onClick={() => handleTextChange(val)} key={i}>
                  {val}
                </p>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="space-y-5 flex flex-col max-sm:hidden">
          <NavLink
            to="/account/login&security"
            className={({ isActive }) => `${isActive ? "text-blue-400" : ""} `}
          >
            Login & security
          </NavLink>
          <NavLink
            to="/account/order"
            className={({ isActive }) => `${isActive ? "text-blue-400" : ""} `}
          >
            Your orders
          </NavLink>
          <NavLink
            to="/account/address"
            className={({ isActive }) => `${isActive ? "text-blue-400" : ""} `}
          >
            Your Addresses
          </NavLink>
          <NavLink
            to="/account/customerCare"
            className={({ isActive }) => `${isActive ? "text-blue-400" : ""} `}
          >
            Customer care
          </NavLink>
          <NavLink
            to="/account/paymentDetails"
            className={({ isActive }) => `${isActive ? "text-blue-400" : ""} `}
          >
            Payment options
          </NavLink>
        </div>
      </div>
      <div className="w-full overflow-auto example pl-10 max-sm:px-5 h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Account;
