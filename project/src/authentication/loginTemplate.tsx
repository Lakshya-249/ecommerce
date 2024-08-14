import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from "react-router-dom";

function LoginTemplate({
  word,
  setlogin,
}: {
  word: String;
  setlogin: (bl: boolean) => void;
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    setlogin(false);
  };
  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 max-sm:w-[93%] max-sm:h-auto z-30 mx-auto right-0 left-0 px-[3rem] py-[1.5rem] space-y-7 
        font-[Mona sans] w-[30rem] text-left rounded-2xl rounded-tr-none bg-white shadow-2xl"
    >
      <div
        onClick={handleClick}
        className="w-[1.5rem] h-[1.5rem] -mt-[2rem] max-sm:-mt-[2rem] max-sm:ml-[18.6rem] ml-[26rem] rounded-full 
        bg-red-400 flex justify-center items-center hover:cursor-pointer"
      >
        <FontAwesomeIcon icon={faXmark} color="white" />
      </div>
      <p className="text-2xl font-semibold">Online Kitchen</p>
      <p className="text-lg text-[#0d0c22]">
        You cannot {word}, create an account.
      </p>
      <div>
        <div className="w-full h-3 border-b-2"></div>
        <div className="w-[3rem] mx-auto -mt-[2rem] h-[3rem] flex rounded-full justify-center items-center bg-white">
          or
        </div>
      </div>
      <button
        onClick={() => navigate("/signup")}
        className="py-4 px-5 rounded-full w-full text-sm font-semibold border-[1px]"
      >
        Continue with email
      </button>
      <p className="text-center text-xs text-gray-400">
        By creating an account you agree with our Terms of Service, Privacy
        Policy, and our default Notification Settings.
      </p>
      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <span
          className="hover:cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Log in
        </span>
      </p>
    </div>
  );
}

export default LoginTemplate;
