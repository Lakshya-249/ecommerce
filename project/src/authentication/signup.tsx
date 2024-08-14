import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../utils/handleApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUptemplate = () => {
  const [formdata, setdata] = useState<{
    [name: string]: string;
    username: string;
    email: string;
    password: string;
  }>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [field, setfield] = useState(false);
  const [terms, seterms] = useState(false);
  const [isusername, setusername] = useState<boolean>(true);
  const [isemail, setemail] = useState<boolean>(true);

  const navigate = useNavigate();
  useEffect(() => {
    const change = () => {
      for (let i in formdata) {
        // console.log(i);
        if (formdata[i].trim() === "") {
          return;
        }
      }
      setfield(true);
    };
    change();
  }, [formdata]);

  const handleClick = async () => {
    if (field && terms) {
      toast("processing request");
      const data = await postRequest("verifyUser", formdata);
      if (data?.err) {
        setusername(false);
        setemail(false);
        return;
      }
      toast(data.message);
    }
  };

  const handleChange = (e: any) => {
    setdata({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <div className="font-sans w-[80%] text-left space-y-[1.5rem] font-bold max-sm:w-full">
      <ToastContainer />
      <p className="font-bold text-md text-right text-gray-500">
        Already a member?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-400 hover:cursor-pointer"
        >
          Sign In
        </span>
      </p>
      <div>
        <p className="text-4xl">Sign up</p>
        <p
          id="errorPara"
          className={`text-red-400 text-md font-semibold ${
            isusername && isemail ? "hidden" : ""
          }`}
        >
          &nbsp;
          <span className="text-[1.6rem]">.</span> Username/Email has already
          been taken
        </p>
      </div>
      <div className="space-y-[1.7rem] w-[75%] max-sm:w-full">
        <div className="flex max-sm:flex-wrap space-x-5 w-full max-sm:space-y-[2.5rem] max-sm:space-x-0">
          <div className="w-full space-y-1">
            <p className="text-md">Name</p>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John"
              className="bg-gray-400/10 rounded-xl py-3 outline-none px-5 font-medium w-full"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="w-full space-y-1">
            <p className="text-md">
              <span className={`${isusername ? "hidden" : ""}`}>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  style={{ color: "#ee6d6d" }}
                />
              </span>
              &nbsp; Username
            </p>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="User"
              className={`rounded-xl py-3 outline-none px-5 font-medium ${
                isusername ? "bg-gray-400/10" : "bg-red-400 placeholder-red-400"
              } w-full`}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-md">
            <span className={`${isemail ? "hidden" : ""}`}>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#ee6d6d" }}
              />
            </span>
            &nbsp; Email
          </p>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="account@gmail.com"
            className={`rounded-xl py-3 outline-none px-5 font-medium ${
              isemail ? "bg-gray-400/10" : "bg-red-400 placeholder-red-400"
            } w-full`}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="space-y-1">
          <p className="text-md">Password</p>
          <input
            type="password"
            name="password"
            id="pass"
            placeholder="6+ characters"
            className="bg-gray-400/10 rounded-xl py-3 outline-none px-5 font-medium w-full mb-5"
            onChange={(e) => handleChange(e)}
          />
          <div className="flex items-stretch">
            <input
              type="checkbox"
              name="check"
              id="mycheck"
              className="self-start mt-4 mr-2"
              onClick={() => {
                seterms(!terms);
              }}
            />
            <label
              htmlFor="mycheck"
              className="text-gray-500 font-medium py-2.5"
            >
              Creating and account means's you agree with our{" "}
              <span className="text-blue-400">
                Terms and Conditions, Privacy Policy
              </span>
              , and our default{" "}
              <span className="text-blue-400">
                Notification <br /> Settings.
              </span>
            </label>
          </div>
        </div>
        <div>
          <button
            onClick={handleClick}
            className={`px-12 py-2 ${
              field && terms ? "bg-blue-700" : "bg-blue-800"
            } font-semibold text-white rounded-xl mb-4 w-full 
            hover:transform hover:scale-105 active:scale-95`}
          >
            Create Account
          </button>
          <p className="text-gray-400 text-sm font-medium">
            This is protected by the CAPTCHA and the Google <br />
            <span className="text-blue-400">Privacy Policy</span> and{" "}
            <span className="text-blue-400">Terms of Conditions</span> apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUptemplate;
