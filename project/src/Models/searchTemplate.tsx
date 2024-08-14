import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronDown,
  faChevronUp,
  faList,
  faListCheck,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SearchFilterModal from "./searchFilterModal";
import { product, review } from "../utils/schema2";
import { getRequest, postRequest } from "../utils/handleApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SearchTemplate() {
  const [block, setBlcok] = useState<boolean>(true);
  const [showFilter, setShow] = useState<boolean>(false);
  const flag = window.matchMedia("(max-width:640px)").matches;
  const [products, setProducts] = useState<Array<product>>([]);
  const [search] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location.search);
    const fetch = async () => {
      const data = await getRequest(`product${location.search}`);
      setProducts(data);
    };
    fetch();
  }, [search]);
  const handleToggle = () => {
    setBlcok(!block);
  };
  const filters: Array<string> = [
    "Price(lowest)",
    "Price(highest)",
    "a2z",
    "z2a",
  ];
  const [showfl, setFL] = useState<boolean>(false);
  const [filterval, setFilter] = useState<string>(filters[0]);
  const toggleFilter = () => {
    setFL(!showfl);
  };
  const addToCart = async (id?: string) => {
    const data = await postRequest("cart", {
      productId: id,
      quantity: 1,
    });
    if (!data.err) {
      toast.success(data.message);
    } else {
      toast.error(data.err);
    }
  };
  const handleFilterChange = (val: string) => {
    setFilter(val);
    setFL(false);

    if (val === "Price(lowest)") {
      navigate(`/searchPage?search=${search.get("search")}&pricel=1`);
    } else if (val === "Price(highest)") {
      navigate(`/searchPage?search=${search.get("search")}&priceh=1`);
    } else if (val === "a2z") {
      navigate(`/searchPage?search=${search.get("search")}&order=asc`);
    } else if (val === "z2a") {
      navigate(`/searchPage?search=${search.get("search")}&order=desc`);
    }
  };
  const avgRating = (prod?: product): number => {
    if (prod === undefined) return 0;
    if (prod.reviews === undefined) return 0;
    const ans =
      prod.reviews.length > 0
        ? prod.reviews.reduce(
            (acc: number, rate: review) =>
              acc + (rate.rating === undefined ? 0 : rate.rating),
            0
          ) / prod.reviews.length
        : 0;
    return ans;
  };

  return (
    <div className="w-full h-full">
      <ToastContainer />
      <div className="pl-2 pb-5 max-sm:flex hidden">
        <div
          onClick={() => setShow(!showFilter)}
          className="bg-gray-400/10 flex items-center space-x-3.5 px-5 py-2 rounded-xl active:bg-black"
        >
          <p>Set filter</p>
          <FontAwesomeIcon icon={faListCheck} />
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        {showFilter ? <SearchFilterModal setShow={setShow} /> : ""}

        <div className="space-x-2 pl-3">
          <FontAwesomeIcon
            className={`p-2 ${
              block ? "bg-gray-200" : ""
            } hover:cursor-pointer rounded-sm`}
            icon={faTableCellsLarge}
            color={block ? "black" : "white"}
            onClick={handleToggle}
          />
          <FontAwesomeIcon
            className={`p-2 ${
              !block ? "bg-gray-200" : ""
            } hover:cursor-pointer rounded-sm`}
            icon={faList}
            color={!block ? "black" : "white"}
            onClick={handleToggle}
          />
        </div>
        <p className="max-sm:text-sm">{products.length} total Results</p>
        <div
          onClick={toggleFilter}
          className="relative max-sm:text-xs border space-x-5 max-sm:space-x-2 border-gray-500 rounded-md 
            py-2 px-5 flex items-center justify-between hover:cursor-pointer max-sm:px-3"
        >
          <p>{filterval}</p>
          <FontAwesomeIcon icon={showfl ? faChevronUp : faChevronDown} />
          <div
            className={`absolute ${
              showfl ? "" : "hidden"
            } top-12 right-0 space-y-2 max-h-[20rem] px-4 py-3 backdrop-blur-lg
            overflow-auto example w-full min-w-fit rounded-xl bg-gray-400/10`}
          >
            {filters.map((filter, i) => (
              <p onClick={() => handleFilterChange(filter)} key={i}>
                {filter}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`flex ${
          block ? "flex-wrap max-sm:grid max-sm:grid-cols-2 " : "flex-col"
        } w-full h-full px-7 max-sm:px-0 max-sm:pt-5`}
      >
        {[...products].map((product, i) => (
          <div key={i}>
            <div
              className={`overflow-hidden ${
                block
                  ? "w-[17.5rem] h-[18rem] max-sm:w-[11rem] max-sm:h-[15rem] rounded-md max-sm:rounded-none hover:-translate-y-2"
                  : "w-[90%] max-sm:w-full max-sm:h-[10rem] h-[14rem] flex"
              }
            hover:transform m-5 max-sm:m-2`}
            >
              <div
                onClick={() => navigate("/productPage/specifics")}
                className={`${
                  block ? "w-full h-[60%]" : "h-full w-[35%]"
                } bg-slate-300`}
              ></div>
              <div
                className={` ${
                  block
                    ? "w-full h-[40%] p-2 bg-gray-500/15"
                    : "w-[65%] h-full py-1.5 px-5"
                } flex flex-col justify-between max-sm:text-xs`}
              >
                <div
                  className={`px-2 max-sm:px-1 ${
                    block ? "space-y-0.5" : "space-y-3"
                  }`}
                >
                  {block ? (
                    <div className="flex justify-between items-center">
                      <p className="text-lg max-sm:text-xs font-semibold">
                        ${product.amount}
                      </p>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            size="xs"
                            key={i}
                            icon={faStar}
                            color={i < avgRating(product) ? "yellow" : "gray"}
                          />
                        ))}
                        <p className="text-sky-500 text-xs px-1">
                          {product.reviews?.length}
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <p
                    className={`text-sm text-gray-400 ${
                      block ? "truncate" : " max-sm:truncate"
                    } `}
                  >
                    {product.name}, {product.product_desc}
                  </p>
                  {!block ? (
                    <div className="flex items-end space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          color={i < avgRating(product) ? "yellow" : "gray"}
                        />
                      ))}
                      <p className="text-sky-500 text-xs px-1">
                        {product.reviews?.length}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  {!block ? (
                    <p className="text-lg font-semibold">${product.amount}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex space-x-3 w-full">
                  <button
                    onClick={() => addToCart(product._id)}
                    className={`p-2 font-semibold bg-black/30 active:bg-black/30
                     hover:bg-gray-600/10 text-sm ${
                       block ? "w-full" : "w-[50%]"
                     }  rounded-xl max-sm:rounded-md text-nowrap`}
                  >
                    Add To Cart
                  </button>
                  <div className="p-2">
                    <FontAwesomeIcon
                      icon={faHeart}
                      color="blue"
                      size={flag ? "xl" : "1x"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchTemplate;
