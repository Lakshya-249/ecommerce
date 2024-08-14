import { useNavigate, useSearchParams } from "react-router-dom";
import { setToken } from "../utils/authentication";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = import.meta.env.VITE_BASE_URL;

function VerificationWindow() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const type = search.get("type");
  const id = search.get("id");
  const token = search.get("token");
  const handleClick = async () => {
    toast("Processing request...");
    const mainurl =
      type === "0"
        ? `${url}updateEmail?token=${token}&id=${id}`
        : `${url}registerUser`;
    const response = await fetch(mainurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error("API Error:", await response.json());
      return;
    }
    const newToken = await response.json();
    setToken(newToken.token);
    if (type === "1") {
      navigate(`/account/address`);
    }
    navigate("/account/login&security");
  };
  return (
    <div className="w-full h-screen flex justify-center text-white items-center">
      <ToastContainer />
      <div className="py-6 px-10 bg-gray-400/10 space-y-5 rounded-md w-[30rem] shadow-lg">
        <h2 className="text-3xl font-bold">Email Verification</h2>
        <p className="mt-4 text-gray-400">
          Verification succesfull, click the button below to continue{" "}
          <span className="text-xl">🎉🎊</span>
        </p>
        <div className="mt-6">
          <button
            onClick={handleClick}
            className="w-full py-2 text-white font-semibold rounded-md bg-blue-700 hover:bg-blue-600"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerificationWindow;
