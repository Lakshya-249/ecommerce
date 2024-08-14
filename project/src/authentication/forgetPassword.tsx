import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = import.meta.env.VITE_BASE_URL;

function ForgetPassword({ show }: { show: () => void }) {
  const [email, setemail] = useState<string>();
  const handleChange = (val: string) => {
    setemail(val);
  };
  const handleSubmit = async () => {
    toast("Processing request...");
    const response = await fetch(`${url}forgetPassword?email=${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
    } else {
      toast.error("Failed to send reset link. Please try again.");
    }
  };
  return (
    <div
      className="absolute max-sm:w-full inset-0 flex flex-col top-0 left-0 bg-[#1a1a1a] textleft
    justify-center z-10  "
    >
      <ToastContainer />
      <div
        onClick={show}
        className="absolute hover:cursor-pointer hover:bg-gray-400/15 top-0 -left-[6rem] max-sm:left-0 p-4 rounded-full inline-block bg-gray-400/10"
      >
        <FontAwesomeIcon icon={faArrowLeft} size="xl" />
      </div>
      <div className="w-[75%] max-sm:w-full space-y-10 p-5">
        <p className="text-4xl font-bold">Forget Password</p>
        <div className="space-y-2 w-full">
          <p className="text-sm font-medium">
            Please enter your email address to reset your password
          </p>
          <input
            onChange={(e) => handleChange(e.target.value)}
            type="email"
            className="bg-gray-400/10 rounded-xl py-3 outline-none px-5 font-medium w-full mb-5"
            placeholder="Email"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="font-semibold text-white rounded-xl bg-blue-700 my-4
            hover:transform hover:scale-105 active:scale-95 py-2 w-full"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ForgetPassword;
