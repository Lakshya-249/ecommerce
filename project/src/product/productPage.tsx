import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faAward,
  faBagShopping,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faCommentDots,
  faLock,
  faMinus,
  faPlus,
  faStar,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import ProductDesc from "./productDesc";
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRequest, postRequest } from "../utils/handleApi";
import { color, product, review } from "../utils/schema2";
import { getToken } from "../utils/authentication";

function ProductPage() {
  const [itemNum, setItemNum] = useState<number>(1);
  const [search] = useSearchParams();
  const [detail, setDetail] = useState<product>();
  const [colorImages, setColorImages] = useState<color>();
  const [image, setImage] = useState<string>();
  const [rating, setRating] = useState<number>();
  const id = search.get("id");
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRequest(`getproductById/${id}`);
      if (data?.err) {
        toast.error("Product not found");
      }
      console.log(data);
      const avgRating =
        data.reviews.length > 0
          ? data.reviews.reduce(
              (acc: number, rate: review) =>
                acc + (rate.rating === undefined ? 0 : rate.rating),
              0
            ) / data.reviews.length
          : 0;
      setRating(avgRating);
      setDetail(data);
      setColorImages(data.colors[0]);
      setImage(data.colors[0].images[0]);
    };
    fetchData();
  }, [search]);
  const handleColor = (id: string) => {
    const data = detail?.colors?.filter(
      (c) => c._id?.toString() === id.toString()
    );
    if (data?.length) {
      setColorImages(data[0]);
      if (data[0].images?.length) setImage(data[0].images[0]);
    }
  };
  const addToCart = async () => {
    if (getToken() === "") {
      toast.error("You need to be logged in write the view reviews");
      return;
    }
    const data = await postRequest("cart", {
      productId: id,
      quantity: itemNum,
    });
    if (!data.err) {
      toast.success(data.message);
    } else {
      toast.error(data.err);
    }
  };

  const subNum = () => {
    if (itemNum > 1) {
      setItemNum(itemNum - 1);
    }
  };
  const addNum = () => {
    setItemNum(itemNum + 1);
  };
  const ref = useRef<HTMLDivElement>(null);
  const handleScrollleft = () => {
    if (ref.current) {
      ref.current.scrollLeft -= 200;
    }
  };
  const handleScrollright = () => {
    if (ref.current) {
      ref.current.scrollLeft += 200;
    }
  };
  const str: Array<string> = [
    "Premimum leather fit",
    "Best peoduct and casual wear",
    "Denim wear casual fitS",
  ];
  return (
    <div className="text-white text-left text-sm font-normal">
      <ToastContainer />
      <div
        className="px-10 pt-24 max-sm:pt-16 pb-3 flex max-sm:flex-wrap 
      max-sm:px-0 bg-gradient-to-br from-[#1a1a1a] to-[#3a3939]"
      >
        <div className="w-[35%] max-sm:w-full p-4">
          <div className={`backdrop-blur-sm space-y-3`}>
            <div className="bg-gray-200/30 w-full h-[30rem] max-sm:h-[20rem] rounded-md">
              {image}
            </div>
            <div className="flex justify-between space-x-1 h-[4rem] max-sm:h-[2.5rem]">
              <div
                onClick={handleScrollleft}
                className="px-1 rounded-l-md flex items-center justify-center h-full hover:bg-black/20"
              >
                <FontAwesomeIcon icon={faChevronLeft} color="white" />
              </div>
              <div
                ref={ref}
                className="flex example space-x-3 overflow-x-scroll"
              >
                {colorImages?.images &&
                  [...colorImages.images].map((image, i) => (
                    <div onClick={() => setImage(image)} key={i}>
                      <div className="bg-white max-sm:w-[2.5rem] w-[4rem] hover:cursor-pointer rounded-sm h-full">
                        {image}
                      </div>
                    </div>
                  ))}
              </div>
              <div
                onClick={handleScrollright}
                className="px-1 flex items-center justify-center rounded-r-md h-full hover:bg-black/20"
              >
                <FontAwesomeIcon icon={faChevronRight} color="white" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[40%] max-sm:w-full space-y-5 py-4 px-7">
          <p>
            {detail?.brand},{detail?.name}, {detail?.product_desc}
          </p>
          <div className="flex flex-wrap max-sm:space-y-2 space-x-5 items-center">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  color={
                    i < (rating !== undefined ? rating : 3) ? "yellow" : "gray"
                  }
                />
              ))}
              <p className="text-yellow-500 px-1">{rating}</p>
            </div>
            <FontAwesomeIcon icon={faCircle} size="xs" />
            <div className="flex space-x-2 items-center">
              <FontAwesomeIcon icon={faCommentDots} color="gray" size="xl" />
              <p className="text-gray-500">{detail?.reviews?.length} reviews</p>
            </div>
            <FontAwesomeIcon icon={faCircle} size="xs" />
            <div className="flex space-x-2 items-center">
              <FontAwesomeIcon icon={faBagShopping} size="xl" color="gray" />
              <p className="text-gray-500">{detail?.totalOrders} orders</p>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <FontAwesomeIcon icon={faCheck} color="green" />
            <p className="text-green-600">In stock</p>
          </div>
          <div className="space-y-3">
            <p className="text-base text-gray-400/70">Select the size</p>
            <div className="w-full flex flex-wrap">
              {detail?.size &&
                [...detail.size].map((s, i) => (
                  <div
                    key={i}
                    className="w-[3rem] h-[3rem] m-1 justify-center flex items-center rounded-md ring-1 ring-gray-500"
                  >
                    {s}
                  </div>
                ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-base text-gray-400/70">Color: Purple</p>
            <div className="w-full flex flex-wrap">
              {detail?.colors &&
                [...detail?.colors].map((color, i) => (
                  <div
                    key={i}
                    onClick={() => handleColor(color._id || "")}
                    className={`w-[3rem] h-[3rem] m-1 ${
                      i == 2 ? "" : "ring-gray-400"
                    } justify-center flex items-center hover:cursor-pointer rounded-md ring-1`}
                  >
                    <div
                      style={{ backgroundColor: `${color.hex}` }}
                      className={`w-[1.5rem] h-[1.5rem] rounded-full`}
                    ></div>
                  </div>
                ))}
            </div>
          </div>
          <ul className="text-gray-300 space-y-2 list-outside list-disc font-normal">
            {str.map((_, i) => (
              <li key={i}>{str[i]}</li>
            ))}
          </ul>
        </div>
        <div className="w-[25%] max-sm:w-full p-4">
          <div className="ring-1 rounded-xl space-y-5 ring-gray-500 px-7 py-4">
            <div className="space-y-1">
              <p className="text-xl text-white font-normal">
                ${detail?.amount} + ${detail?.tax}
              </p>
              <p className="text-gray-300 text-xs font-normal">
                Price included taxes & VAT
              </p>
            </div>
            <div className="space-x-2 flex items-center">
              <div className="ring-1 rounded-md w-[40%] flex justify-around items-center ring-gray-500 px-4 py-2">
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={subNum}
                  className="hover:cursor-pointer"
                  color="gray"
                />
                <p>{itemNum}</p>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="hover:cursor-pointer"
                  onClick={addNum}
                  color="gray"
                />
              </div>
              <p className="text-base">Items.</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={addToCart}
                className="w-full bg-black/50 hover:bg-black active:bg-black/40 rounded-lg p-2"
              >
                Add to cart
              </button>
              <button className="w-full bg-gray-500/50 hover:bg-gray-500/60 active:bg-gray-400/10 rounded-lg p-2">
                Buy
              </button>
            </div>
            <div className="flex justify-center items-center space-x-3">
              <FontAwesomeIcon icon={faHeart} />
              <p className="text-lg text-blue-600">Add to wishlist</p>
            </div>
            <div className="border-t-[1px] space-y-3 border-gray-400 py-5">
              <div className="flex space-x-4 items-center">
                <FontAwesomeIcon icon={faTruck} color="gray" />
                <p className="text-gray-300">Worldwide shipping</p>
              </div>
              <div className="flex space-x-5 items-center">
                <FontAwesomeIcon icon={faLock} color="gray" />
                <p className="text-gray-300">Secure payment</p>
              </div>
              <div className="flex space-x-5 items-center">
                <FontAwesomeIcon icon={faAward} color="gray" />
                <p className="text-gray-300">2 years full warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductDesc />
    </div>
  );
}

export default ProductPage;
