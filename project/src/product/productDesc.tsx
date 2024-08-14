import { NavLink, Outlet, useSearchParams } from "react-router-dom";

function ProductDesc() {
  const [search] = useSearchParams();
  const id = search.get("id");
  return (
    <div className="px-[6rem] py-[3rem] max-sm:px-0 max-sm:py-10">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#3a3939] rounded-md py-6">
        <div
          className="font-semibold border-b-[1px] overflow-x-auto example 
        text-nowrap border-gray-500 space-x-7 px-8 max-sm:px-4 items-center flex"
        >
          <NavLink
            to={`/productPage/specifics?id=${id}`}
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-400 border-b-2 border-blue-400" : ""
              } px-2 pb-5`
            }
          >
            Specifications
          </NavLink>
          <NavLink
            to={`/productPage/review?id=${id}`}
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-400 border-b-2 border-blue-400" : ""
              } px-2 pb-5`
            }
          >
            Reviews
          </NavLink>
          <NavLink
            to={`/productPage/shopinfo?id=${id}`}
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-400 border-b-2 border-blue-400" : ""
              } px-2 pb-5`
            }
          >
            Shipping info
          </NavLink>
          <NavLink
            to={`/productPage/sellerinfo?id=${id}`}
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-400 border-b-2 border-blue-400" : ""
              } px-2 pb-5`
            }
          >
            Seller profile
          </NavLink>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProductDesc;
