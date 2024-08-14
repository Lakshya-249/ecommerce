import { useNavigate, useSearchParams } from "react-router-dom";
import { setToken } from "../utils/authentication";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
const url = import.meta.env.VITE_BASE_URL;

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const [pass, setpass] = useState<string>();
  const token = search.get("token");
  const handlePass = (val: string) => {
    setpass(val);
  };
  const handleClick = async () => {
    toast("Processing request...");
    const response = await fetch(`${url}resetPassword?newPassword=${pass}`, {
      method: "PUT",
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
    navigate(`/login`);
  };
  return (
    <div className="w-full h-screen flex justify-center text-white items-center">
      <ToastContainer />
      <div
        className="py-6 px-10 bg-gray-400/10 
      space-y-5 rounded-md w-[26rem] max-sm:w-full shadow-lg"
      >
        <h2 className="text-3xl font-bold">Reset Password</h2>
        <p className="mt-4 text-gray-400">
          Enter your new password <span className="text-xl">🎉🎊</span>
        </p>
        <input
          type="password"
          onChange={(e) => handlePass(e.target.value)}
          placeholder="Enter new password"
          className="w-full py-3 px-5 rounded-xl bg-gray-500/10"
        />
        <div className="mt-6">
          <button
            onClick={handleClick}
            className="w-full py-2 text-white font-semibold rounded-lg bg-blue-700 hover:bg-blue-600"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
