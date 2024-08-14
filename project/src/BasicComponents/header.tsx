import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
  faCartArrowDown,
  faSearch,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { getRequest } from "../utils/handleApi";
import { useState } from "react";
import { product } from "../utils/schema2";
import { getToken } from "../utils/authentication";

function Header({ head }: { head: boolean }) {
  const navigate = useNavigate();
  const [searchItem, setSearch] = useState<product[]>([]);

  const debounce = (cb: (word: any) => void, delay: number = 1000) => {
    return (...args: [string]) => {
      setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const handleupdate = debounce(async (text) => {
    const data = await getRequest(`searchProduct?search=${text}`);
    console.log(data);
    setSearch(data);
    // console.log(text);
  });

  const handleChange = (val: string) => {
    if (val.trim() === "") return;
    handleupdate(val);
    // console.log(e.target.value);
  };

  return (
    <div
      className={`w-full px-8 ${
        head
          ? "bg-[#1a1a1a] border-gray-500 border-b-[0.5px] py-2"
          : "bg-transparent py-3.5"
      } fixed top-0 z-20 flex justify-between text-white font-semibold max-sm:hidden`}
    >
      <div className="space-x-5 flex items-center justify-center">
        <p className="text-3xl font-bold">eComm</p>
        <p className="font-light text-2xl text-gray-400">|</p>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/searchPage?search=">Explore</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <div
        className="relative space-x-3 px-6 py-3.5 bg-transparent/15 rounded-2xl 
      hover:bg-transparent/40 flex items-center active:bg-transparent/35 w-[30%]"
      >
        <FontAwesomeIcon icon={faSearch} color="gray" />
        <input
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          className="bg-transparent w-full placeholder:text-gray-400/60 outline-none"
          placeholder="Search"
        />
        <div
          className=" absolute w-full max-h-[25rem] overflow-auto
        z-20 right-0 top-14 rounded-lg backdrop-blur-md backdrop-brightness-50"
        >
          {searchItem &&
            searchItem.map((item, i) => (
              <p
                key={i}
                onClick={() => {
                  setSearch([]);
                  navigate(`/searchPage?search=${item.name}`);
                }}
                className="text-sm py-2 hover:cursor-pointer"
              >
                {item.name}
              </p>
            ))}
        </div>
      </div>
      <div className="flex space-x-3">
        {getToken() === "" ? (
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-3.5 font-semibold rounded-xl bg-transparent/10 hover:bg-transparent/20"
          >
            <FontAwesomeIcon className="pr-2.5" icon={faWallet} />
            Login
          </button>
        ) : (
          ""
        )}
        <div
          onClick={() =>
            getToken() !== ""
              ? navigate("/account/login&security")
              : navigate("/login")
          }
          className="p-3.5 rounded-xl bg-transparent/10 hover:bg-transparent/20 hover:cursor-pointer"
        >
          <FontAwesomeIcon icon={faCircleUser} size="xl" />
        </div>
        <div
          onClick={() => navigate("/cart")}
          className="p-3.5 rounded-xl bg-transparent/10 hover:bg-transparent/20 hover:cursor-pointer"
        >
          <FontAwesomeIcon icon={faCartArrowDown} />
        </div>
      </div>
    </div>
  );
}

export default Header;
