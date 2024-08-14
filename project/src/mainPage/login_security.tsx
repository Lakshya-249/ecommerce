import { useEffect, useState } from "react";
import { userDetails } from "../utils/schema";
import { getRequest } from "../utils/handleApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CorrectionWindow from "../BasicComponents/correctionWindow";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/authentication";

function Login_security() {
  const [details, setDetails] = useState<userDetails>({});
  const navigate = useNavigate();
  const [showCorrection, setShowCorrection] = useState<boolean>(false);
  const handleCorrectionClose = () => {
    setShowCorrection(!showCorrection);
  };
  const handleEdit = (val: string) => {
    navigate(`/account/login&security?keyval=${val}`);
    handleCorrectionClose();
  };
  const capitalize = (str: string): string => {
    const nstr: string = str[0].toUpperCase() + str.slice(1);
    return nstr;
  };
  useEffect(() => {
    const fetch = async () => {
      const data = await getRequest("userDetails");
      if (data.err) {
        toast.error("Failed to fetch user details");
        console.error(data.message);
      } else {
        setDetails(data);
      }
    };
    fetch();
  }, []);
  const handleLogOut = () => {
    removeToken();
  };
  return (
    <div className="w-full space-y-6 pb-5">
      <ToastContainer />
      <p className="text-3xl font-semibold">Login & Security</p>
      <div className="rounded-lg w-[55%] max-sm:w-full overflow-hidden border flex flex-col border-gray-500 ">
        <div className="flex px-7 py-4 border-b border-gray-500 font-semibold justify-between">
          <p>Logout</p>
          <button
            onClick={handleLogOut}
            className="px-5 py-2 rounded-xl bg-gray-400/10 
              hover:bg-gray-400/20 active:bg-black/10"
          >
            Sign out
          </button>
        </div>
        {Object.keys(details).map((kval, i) => (
          <div
            key={i}
            className="flex px-7 py-4 border-b border-gray-500 justify-between"
          >
            <div className="space-y-0.5">
              <p className="font-semibold">
                {capitalize(kval === "_id" ? "UserId" : kval)}
              </p>
              <p className="font-light text-gray-300">
                {kval === "password"
                  ? "*******"
                  : details[kval as keyof userDetails]}
              </p>
            </div>
            <div>
              {kval !== "_id" ? (
                <button
                  onClick={() => handleEdit(kval)}
                  className="px-10 py-2 rounded-xl bg-gray-400/10 
              hover:bg-gray-400/20 active:bg-black/10"
                >
                  Edit
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
        <div className="flex px-7 py-4 border-b border-gray-500 font-semibold justify-between">
          <p className="text-red-400">Delete Account</p>
          <button
            className="px-7 py-2 rounded-xl bg-red-500 
              hover:bg-red-400 active:bg-black/10"
          >
            Delete
          </button>
        </div>
      </div>
      {showCorrection ? <CorrectionWindow show={handleCorrectionClose} /> : ""}
    </div>
  );
}

export default Login_security;
