import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/authentication";
import ForgetPassword from "./forgetPassword";
import { postRequest } from "../utils/handleApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signintemplate = () => {
  const [formdata, setdata] = useState<{ [key: string]: string }>({
    username: "",
    password: "",
  });
  const [field, setfield] = useState<boolean>(false);
  const [isusername, setusername] = useState<boolean>(true);
  const [showforget, setshowforget] = useState<boolean>(false);

  const toggleShowForget = () => {
    setshowforget(!showforget);
  };

  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const change = () => {
      for (let i in formdata) {
        // console.log(i);
        if (formdata[i].trim() === "") {
          setfield(false);
          return;
        }
      }
      setfield(true);
    };
    change();
  }, [formdata]);

  const handleClick = async () => {
    if (field) {
      toast("wait processing request");
      const data = await postRequest("login", {
        email: formdata.username,
        password: formdata.password,
      });
      if (data.err >= 400) {
        setusername(false);
        return;
      }
      // const data = await response.json();
      setToken(data.token);
      navigate("/");
      // console.log(data);
    }
  };

  const handleChange = (e: any) => {
    setdata({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative font-sans w-[80%] text-left space-y-[1.5rem] font-bold max-sm:w-full">
      <ToastContainer />
      <p className="font-bold text-md text-right text-gray-500">
        Not a member?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-blue-500 hover:cursor-pointer"
        >
          Sign up
        </span>
      </p>
      <div>
        <p className="text-5xl font-bold mb-10">Login</p>
        <p
          id="errorPara"
          className={`text-red-400 text-md font-semibold ${
            isusername ? "hidden" : ""
          }`}
        >
          &nbsp;
          <span className="text-[1.6rem]">.</span> Username/Password Incorrect
        </p>
      </div>
      <div className="space-y-[2rem] w-[76%] max-sm:px-2 max-sm:w-full">
        <div className="space-y-1">
          <p className="text-md">
            <span className={`${isusername ? "hidden" : ""}`}>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#ee6d6d" }}
              />
            </span>
            &nbsp; Username / email
          </p>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="User_234"
            className={`rounded-xl py-3 outline-none px-5 font-medium ${
              isusername ? "bg-gray-400/10" : "bg-red-400 placeholder-red-400"
            } w-full`}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="space-y-1">
          <p className="text-md">
            <span className={`${isusername ? "hidden" : ""}`}>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#ee6d6d" }}
              />
            </span>
            &nbsp; Password
          </p>
          <input
            type="password"
            name="password"
            id="pass"
            placeholder="6+ characters"
            className="bg-gray-400/10 rounded-xl py-3 outline-none px-5 font-medium w-full mb-5"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <button
            onClick={handleClick}
            className={`px-12 py-2 ${
              field ? "bg-blue-700" : "bg-blue-800"
            } font-semibold text-white rounded-xl my-4 w-full
            hover:transform hover:scale-110 active:scale-95`}
          >
            Sign In
          </button>
          <p className="text-gray-400 text-sm font-medium">
            This is protected by the CAPTCHA and the Google <br />
            <span className="text-blue-400">Privacy Policy</span> and{" "}
            <span className="text-blue-400">Terms of Conditions</span> apply.
          </p>
          <p
            onClick={toggleShowForget}
            className="text-blue-600 hover:cursor-pointer active:text-violet-500 text-base py-3 font-semibold"
          >
            Forget password?
          </p>
        </div>
      </div>
      {showforget ? <ForgetPassword show={toggleShowForget} /> : ""}
    </div>
  );
};

export default Signintemplate;
