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

function ItemModelList({ item }: { item: string }) {
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
  }, []);
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
        <p className="font-bold max-sm:text-xl text-4xl">{item}</p>
        <button
          className="p-3.5 font-semibold max-sm:hidden active:bg-black/30
        bg-gray-200/10 hover:bg-gray-600/10 rounded-xl"
        >
          View category
        </button>
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
          className="flex space-x-4 max-sm:px-5 overflow-x-scroll transition-all duration-200 ease-linear example"
        >
          {[...products].map((product, i) => (
            <div
              key={i}
              className="transition-all duration-200 hover:-translate-y-1.5"
            >
              <div className="w-[17.4rem] h-[17.5rem] max-sm:w-[15.5rem] max-sm:[15.5rem] rounded-lg overflow-hidden">
                <div
                  onClick={() =>
                    navigate(`/productPage/specifics?id=${product._id}`)
                  }
                  className="h-[60%] overflow-hidden"
                >
                  <img
                    loading="lazy"
                    className="object-cover"
                    src="https://images.unsplash.com/photo-1542598953-41310c43f54b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="..."
                  />
                </div>
                <div className="h-[40%] flex flex-col text-left bg-gray-500/15 justify-between p-2">
                  <div className="px-2">
                    <p className="text-lg font-semibold">${100 + i}</p>
                    <p className="text-sm text-gray-400 truncate">
                      {product.name}, {product.product_desc}
                    </p>
                  </div>
                  <div className="flex space-x-3 px-1">
                    <button
                      onClick={() => addToCart(product._id)}
                      className="p-2 font-semibold bg-black/30 active:bg-black/30
                     hover:bg-gray-600/10 text-sm w-full rounded-xl"
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

export default ItemModelList;
