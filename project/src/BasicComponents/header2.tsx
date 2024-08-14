import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCartArrowDown,
  faSearch,
  faWallet,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/authentication";
import { getRequest } from "../utils/handleApi";
import { product } from "../utils/schema2";

function Header2({ head }: { head: boolean }) {
  const [hide, setHide] = useState<boolean>(true);
  const [search, setSearch] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<product[]>([]);
  const navigate = useNavigate();
  const handleToggle = () => {
    setHide(!hide);
    // console.log(hide);
  };
  const handleSearchToggle = () => {
    setSearch(!search);
    // console.log(search);
  };
  const debounce = (cb: (word: any) => void, delay: number = 1000) => {
    return (...args: [string]) => {
      setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const handleupdate = debounce(async (text) => {
    const data = await getRequest(`searchProduct?search=${text}`);
    // console.log(data);
    setSearchItem(data);
    console.log(searchItem);
  });

  const handleChange = (val: string) => {
    if (val.trim() === "") return;
    handleupdate(val);
    // console.log(e.target.value);
  };
  return (
    <div className="w-full relative">
      <div
        className={`w-full px-7 ${
          head
            ? "bg-[#1a1a1a] border-gray-500 border-b-[0.5px] py-2"
            : "bg-transparent py-3.5"
        } fixed top-0 z-20 hidden justify-between items-center text-white font-semibold max-sm:flex`}
      >
        <div className="space-x-5 flex items-center justify-center">
          <p className="text-2xl font-bold">eComm</p>
          <p className="font-light text-2xl text-gray-400">|</p>
        </div>
        <div className="space-x-7">
          {getToken() === "" ? (
            <button className="py-2.5 px-3 font-semibold rounded-xl bg-transparent/10 hover:bg-transparent/20">
              <FontAwesomeIcon className="pr-2" icon={faWallet} />
              Log...
            </button>
          ) : (
            ""
          )}
          <FontAwesomeIcon onClick={handleSearchToggle} icon={faSearch} />
          {getToken() !== "" ? (
            <FontAwesomeIcon
              onClick={() => navigate("/cart")}
              icon={faCartArrowDown}
            />
          ) : (
            ""
          )}
          <FontAwesomeIcon
            onClick={handleToggle}
            icon={hide ? faBars : faXmark}
            size="xl"
          />
        </div>
      </div>
      <div
        className={`absolute flex-col ${
          hide ? "hidden" : "flex"
        } text-left justify-end top-0 left-0 z-10 text-white w-full pt-16 bg-black`}
      >
        <div className="space-y-4 w-full bg-[#1a1a1a]">
          <div className="space-y-4 px-5 pt-4">
            <p
              onClick={() => {
                handleToggle();
                navigate("/");
              }}
            >
              Home
            </p>
            <p onClick={() => navigate("/searchPage?search=")}>Explore</p>
            <p
              onClick={() => {
                handleToggle();
                navigate("/about");
              }}
            >
              About
            </p>
          </div>
          <div className="border-b-[1px] border-gray-500"></div>
          <div className="px-5 pb-5 space-y-4">
            <p
              onClick={() => {
                handleToggle();
                navigate("/cart");
              }}
            >
              <FontAwesomeIcon icon={faCartArrowDown} />
              &nbsp;&nbsp;&nbsp;Cart
            </p>
            <p
              onClick={() => {
                handleToggle();
                navigate("/account/login&security");
              }}
            >
              <FontAwesomeIcon icon={faCircleUser} />
              &nbsp;&nbsp;&nbsp;Account
            </p>
          </div>
        </div>
      </div>
      <div
        className={`absolute inset-0 bg-[#1a1a1a] w-full ${
          search ? "flex" : "hidden"
        }
        h-[4.5rem] items-center justify-center px-2 z-30`}
      >
        <div
          className="w-full bg-transparent/15 rounded-2xl overflow-hidden
      hover:bg-transparent/40 flex items-center justify-between"
        >
          <div className="relative flex space-x-3 px-6 py-3.5 items-center">
            <FontAwesomeIcon
              onClick={handleSearchToggle}
              icon={faXmark}
              color="gray"
            />
            <input
              type="text"
              onChange={(e) => handleChange(e.target.value)}
              className="bg-transparent text-white placeholder:text-gray-400/60 outline-none"
              placeholder="Search"
            />
          </div>
          <div
            className="absolute w-full max-h-[25rem] text-white overflow-auto z-40
              right-0 top-16 rounded-lg backdrop-blur-md backdrop-brightness-50"
          >
            {searchItem &&
              searchItem.map((item, i) => (
                <p
                  key={i}
                  onClick={() => {
                    setSearchItem([]);
                    navigate(`/searchPage?search=${item.name}`);
                  }}
                  className="text-sm py-2 hover:cursor-pointer"
                >
                  {item.name}
                </p>
              ))}
          </div>
          <div className="py-3.5 px-3 w-[4rem] text-white bg-gray-400/10">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header2;
