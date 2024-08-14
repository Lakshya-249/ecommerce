import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { product } from "../utils/schema2";
import { getRequest, postRequest } from "../utils/handleApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../utils/authentication";

function ItemModelList2({ item }: { item: string }) {
  const [products, setProducts] = useState<product[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const data = await getRequest(`product?search=${item}`);
      if (data?.err) {
        toast.error("Failed to fetch products");
        console.error("API Error:", data.err);
        return;
      }
      setProducts(data);
    };
    fetch();
  }, [item]);
  const addToCart = async (id?: string) => {
    if (getToken() === "") {
      toast.error("You need to be logged in write the view reviews");
      return;
    }
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
  const capitalize = (str: string): string => {
    const nstr: string = str[0].toUpperCase() + str.slice(1);
    return nstr;
  };
  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollLeft += 1280;
    }
  };
  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollLeft -= 1280;
    }
  };
  return (
    <div className="w-full flex flex-col text-white space-y-3.5">
      <ToastContainer />
      <div className="w-full flex justify-between px-8 max-sm:px-6 items-center">
        <p className="font-bold max-sm:text-xl py-5 text-4xl">
          {capitalize(item)}
        </p>
      </div>
      <div className="w-full flex items-center">
        <div
          onClick={scrollLeft}
          className="p-1 m-1 max-sm:hidden flex h-[17rem] items-center 
        hover:cursor-pointer hover:bg-gray-400/10 rounded-md"
        >
          <FontAwesomeIcon icon={faChevronLeft} size="xl" />
        </div>
        <div
          ref={ref}
          className="flex max-sm:px-5 flex-wrap justify-around transition-all duration-200 ease-linear example"
        >
          {[...products].map((product, i) => (
            <div
              key={i}
              className="transition-all mb-5 duration-200 hover:-translate-y-1.5  shadow-gray-200"
            >
              <div className=" h-[20rem] max-w-[27rem] max-sm:w-[10rem] overflow-hidden">
                <div
                  onClick={() =>
                    navigate(`/productPage/specifics?id=${product._id}`)
                  }
                  className="h-[60%] overflow-hidden"
                >
                  <img
                    className="object-cover"
                    loading="lazy"
                    src="https://images.unsplash.com/photo-1586689311267-e88bb0509995?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="..."
                  />
                </div>
                <div className="h-[40%] flex flex-col text-left justify-between p-2">
                  <div className="py-3">
                    <p className="text-lg font-semibold">${100 + i}</p>
                    <p className="text-sm text-gray-200 truncate">
                      {product.name}, {product.product_desc}
                    </p>
                  </div>
                  <div className="flex space-x-3 px-1">
                    <button
                      onClick={() => addToCart(product._id)}
                      className="p-2 font-semibold bg-black/30 active:bg-black/30 max-sm:text-xs
                     hover:bg-gray-600/10 text-sm w-full rounded-xl border-gray-500 border"
                    >
                      Add To Cart
                    </button>
                    <div className="p-2">
                      <FontAwesomeIcon icon={faHeart} color="blue" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          onClick={scrollRight}
          className="p-1 m-1 flex hover:bg-gray-400/10 max-sm:hidden
          hover:cursor-pointer items-center h-[17rem] rounded-md"
        >
          <FontAwesomeIcon icon={faChevronRight} size="xl" />
        </div>
      </div>
    </div>
  );
}

export default ItemModelList2;
