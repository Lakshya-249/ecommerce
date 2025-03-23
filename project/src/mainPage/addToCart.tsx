import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { cart, product, review } from "../utils/schema2";
import { getRequest, putRequest } from "../utils/handleApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentPopup from "../product/payementPop";

function AddToCart() {
  type costCart = {
    _id?: string;
    amount?: number;
    tax?: number;
  };
  const [products, setProducts] = useState<cart[]>([]);
  const [cost, setCost] = useState<number>(0);
  const [quantity, setQuantity] = useState<costCart[]>([]);
  const [totalTax, setTotalTax] = useState<number>(0);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Function to get selected cart items
  const getSelectedItems = () => {
    return products.filter((p) =>
      quantity.some((q) => q._id?.toString() === p._id?.toString())
    );
  };
  const handleItemIncr = async (product: cart) => {
    if (product.quantity === undefined) return;

    const updatedProduct = { ...product, quantity: product.quantity + 1 };
    const updatedProducts = products.map((p) =>
      p._id?.toString() === product._id?.toString() ? updatedProduct : p
    );

    // Update state optimistically (only if the request succeeds)
    const response = await putRequest(`cart/${product._id}`, {
      quantity: updatedProduct.quantity,
    });

    if (response.err) {
      toast.error(response.err);
    } else {
      setProducts(updatedProducts);
      // toast.success(response.message);

      const ind = quantity.findIndex(
        (quant) => quant._id?.toString() === product._id?.toString()
      );

      if (ind > -1) {
        const amount = product?.product?.amount || 0;
        const tax = product?.product?.tax || 0;
        setCost((prevCost) => prevCost + amount);
        setTotalTax((prevTax) => prevTax + tax);
      }
    }
  };

  const handleSubmitClick = () => {
    const selectedItems = getSelectedItems();
    if (selectedItems.length === 0) {
      toast.error("Please select items to purchase");
      return;
    }
    setIsPaymentOpen(true);
  };

  const handleItemDecr = async (product: cart) => {
    if (product.quantity === undefined || product.quantity <= 1) return;

    const updatedProduct = { ...product, quantity: product.quantity - 1 };
    const updatedProducts = products.map((p) =>
      p._id?.toString() === product._id?.toString() ? updatedProduct : p
    );

    // Update state optimistically (only if the request succeeds)
    const response = await putRequest(`cart/${product._id}`, {
      quantity: updatedProduct.quantity,
    });

    if (response.err) {
      toast.error(response.err);
    } else {
      setProducts(updatedProducts);
      // toast.success(response.message);

      const ind = quantity.findIndex(
        (quant) => quant._id?.toString() === product._id?.toString()
      );

      if (ind > -1) {
        const amount = product?.product?.amount || 0;
        const tax = product?.product?.tax || 0;
        setCost((prevCost) => prevCost - amount);
        setTotalTax((prevTax) => prevTax - tax);
      }
    }
  };

  const handleQuantity = (prod?: cart) => {
    if (!prod || !prod.product?.amount || !prod.product?.tax) return;

    const itemTotal = prod.product.amount * (prod.quantity || 1);
    const itemTax = prod.product.tax * (prod.quantity || 1);

    const existingItemIndex = quantity.findIndex(
      (quant) => quant._id?.toString() === prod._id?.toString()
    );

    // If item exists in quantity array, remove it (unchecking)
    if (existingItemIndex > -1) {
      const updatedQuantity = quantity.filter(
        (item) => item._id?.toString() !== prod._id?.toString()
      );
      setQuantity(updatedQuantity);

      // Subtract the item's total from cost and tax
      setCost((prevCost) => prevCost - itemTotal);
      setTotalTax((prevTax) => prevTax - itemTax);
    }
    // If item doesn't exist, add it (checking)
    else {
      const newItem = {
        _id: prod._id,
        amount: itemTotal,
        tax: itemTax,
      };
      setQuantity((prev) => [...prev, newItem]);

      // Add the item's total to cost and tax
      setCost((prevCost) => prevCost + itemTotal);
      setTotalTax((prevTax) => prevTax + itemTax);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRequest("cart");
      if (data?.err) {
        console.log(data.err);
        toast(data.err);
        return;
      }
      console.log(data);

      setProducts(data);
    };
    fetchData();
  }, []);
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
    <div className="w-full h-screen flex flex-col text-white text-left pt-24 max-sm:pt-20 px-[10rem] max-sm:px-4">
      <ToastContainer />
      <p className="text-4xl font-semibold mb-3.5">Shoping Cart</p>
      <div className="flex justify-between py-2 border-b border-gray-500">
        <p className="max-sm:hidden">Select</p>
        <p>Items</p>
        <p className="max-sm:hidden">Price</p>
      </div>
      <div className="py-5 overflow-auto example">
        {[...products].map((product, i) => (
          <div
            key={i}
            className="w-full flex items-center justify-between max-sm:justify-start 
            max-sm:items-start max-sm:py-2 max-sm:space-x-3.5"
          >
            <input type="checkbox" onClick={() => handleQuantity(product)} />
            <div className="w-[80%] h-[12rem] max-sm:h-auto max-sm:w-full py-2 max-sm:py-0 flex">
              <div className="flex flex-col justify-between max-sm:pb-5 space-y-4">
                <div className="h-full w-[15rem] max-sm:w-[7rem] max-sm:h-[7rem] rounded-lg bg-slate-300"></div>
                <div className="ring-1 max-sm:flex rounded-md w-[80%] mx-2 hidden justify-around items-center ring-gray-500 px-3 py-1">
                  <FontAwesomeIcon
                    icon={faMinus}
                    onClick={() => handleItemDecr(product)}
                    className="hover:cursor-pointer"
                    color="gray"
                  />
                  <p>{product.quantity}</p>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="hover:cursor-pointer"
                    onClick={() => handleItemIncr(product)}
                    color="gray"
                  />
                </div>
              </div>
              <div className="h-full py-1.5 px-5 flex flex-col max-sm:space-y-3.5 justify-between max-sm:py-0">
                <div className={`px-2 space-y-3 max-sm:space-y-2 max-sm:px-0`}>
                  <p className={`text-sm text-gray-400 `}>
                    {product.product?.name}, {product.product?.product_desc}
                  </p>
                  <div className="flex items-end space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        color={
                          i < avgRating(product.product) ? "yellow" : "gray"
                        }
                      />
                    ))}
                    <p className="text-sky-500 text-xs px-1">
                      {product.product?.reviews?.length}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    {product.size && product.size.trim() !== "" ? (
                      <div className="w-[3rem] h-[3rem] m-1 justify-center flex items-center rounded-md ring-1 ring-gray-500">
                        {product.size}
                      </div>
                    ) : (
                      ""
                    )}
                    {product.color && product.color.trim() !== "" ? (
                      <div
                        key={i}
                        className={`w-[3rem] h-[3rem] m-1 ${
                          i == 2 ? "" : "ring-gray-400"
                        } justify-center flex items-center rounded-md ring-1 ring-gray-500`}
                      >
                        <div
                          style={{ backgroundColor: `${product.color}` }}
                          className={`w-[1.5rem] h-[1.5rem] rounded-full`}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="text-lg max-sm:block hidden font-semibold">
                    ${(product.product?.amount || 1) * (product.quantity || 1)}
                  </p>
                </div>
                <div className="ring-1 max-sm:hidden rounded-md w-[20%] max-sm:w-[50%] mx-2 flex justify-around items-center ring-gray-500 px-3 py-2">
                  <FontAwesomeIcon
                    icon={faMinus}
                    onClick={() => handleItemDecr(product)}
                    className="hover:cursor-pointer"
                    color="gray"
                  />
                  <p>{product.quantity}</p>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="hover:cursor-pointer"
                    onClick={() => handleItemIncr(product)}
                    color="gray"
                  />
                </div>
              </div>
            </div>
            <div className="max-sm:hidden">
              <p className="text-lg font-semibold">
                $ {(product.product?.amount || 1) * (product.quantity || 1)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t py-5 border-gray-500 flex justify-between">
        <button
          onClick={handleSubmitClick}
          className="bg-gray-500/10 w-[13rem] hover:bg-black active:bg-black/40 rounded-lg p-2"
        >
          Buy
        </button>
        <div className="flex space-x-5">
          <p className="text-lg font-semibold">Total :</p>
          <p>${cost}</p>
        </div>
      </div>
      <PaymentPopup
        carts={getSelectedItems()}
        tax={totalTax}
        totalCost={cost}
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
      />
    </div>
  );
}

export default AddToCart;
