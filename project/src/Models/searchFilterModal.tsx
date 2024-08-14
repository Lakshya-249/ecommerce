import {
  faChevronDown,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getRequest } from "../utils/handleApi";

function SearchFilterModal({
  setShow,
}: {
  setShow: ((val: boolean) => void) | undefined;
}) {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
  const [brand, setBrand] = useState<string>("All");
  const [category, setCategory] = useState<string>();
  const [brands, setBrands] = useState<string[]>([]);
  const [showBr, setBr] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(1);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRequest(`product?search=${search.get("search")}`);
      if (data?.err) {
        console.error("API Error:", data.err);
        return;
      }
      const st = new Set<string>();
      const st2 = new Set<string>();
      for (const d of data) {
        st.add(d.brand.toLowerCase());
        st2.add(d.name);
        // console.log(d.name);
      }
      setBrands([...st]);
      setCategories([...st2]);
    };
    fetchData();
  }, [search]);
  const togglebrand = () => {
    setBr(!showBr);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleBrandChange = (val?: string) => {
    if (val === undefined) return;
    setBrand(val);
  };
  const applyFilter = () => {
    navigate(
      `/searchPage?search=${
        category?.trim() === "" ? search.get("search") : category
      }&order=${search.get("order")}&brand=${
        brand === "All" ? "" : brand
      }&price=${price}`
    );
  };
  return (
    <div
      className="space-y-5 max-sm:space-y-10 max-sm:fixed top-0 left-0 max-sm:px-6 z-30 max-sm:pt-5 
    max-sm:bg-[#141414] max-sm:backdrop-blur-xl max-sm:h-full max-sm:w-[60%]"
    >
      <div className="absolute hidden max-sm:block top-5 right-5">
        <FontAwesomeIcon
          onClick={() => setShow !== undefined && setShow(false)}
          icon={faXmark}
          size="xl"
        />
      </div>
      <div className="space-y-3">
        <p className="font-semibold text-2xl max-sm:pb-2">Category</p>
        {categories.map((category, i) => (
          <div key={i} className="space-x-2.5 px-2 max-sm:px-4">
            <input
              type="checkbox"
              onChange={(e) => setCategory(e.target.value)}
              id={category}
              value={category}
            />
            <label
              htmlFor={category}
              className="text-gray-400 hover:cursor-pointer"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <p className="font-semibold text-xl">Brands</p>
        <div
          onClick={togglebrand}
          className="relative border border-gray-500 rounded-md 
            py-2 px-5 flex items-center justify-between hover:cursor-pointer"
        >
          <p>{brand}</p>
          <FontAwesomeIcon icon={showBr ? faChevronUp : faChevronDown} />
          <div
            className={`absolute ${
              showBr ? "" : "hidden"
            } top-12 space-y-2 max-h-[20rem] px-4 py-3 backdrop-blur-lg
            overflow-auto example w-full left-0 rounded-xl bg-gray-400/10`}
          >
            {brands?.map((brand, i) => (
              <p onClick={() => handleBrandChange(brand)} key={i} className="">
                {brand}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-2 px-0.5">
        <p className="font-semibold text-xl">Price</p>
        <p>$ {price}</p>
        <input
          type="range"
          min={1}
          max={100000}
          onChange={(e) => handlePriceChange(e)}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <button
        onClick={() => {
          setBrand("All");
          setCategory("");
        }}
        className="px-6 py-3.5 font-semibold rounded-xl bg-gray-400/10 
      hover:bg-gray-400/20 active:bg-black/10"
      >
        Clear filters
      </button>
      <button
        onClick={applyFilter}
        className="py-2 font-semibold rounded-xl border border-gray-500 w-full 
      hover:bg-gray-400/20 active:bg-black/10"
      >
        Apply filters
      </button>
    </div>
  );
}

export default SearchFilterModal;
