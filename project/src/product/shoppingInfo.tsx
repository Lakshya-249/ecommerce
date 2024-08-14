import { useEffect, useState } from "react";
import { shoppingInfo } from "../utils/schema2";
import { getRequest } from "../utils/handleApi";
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShoppingInfo() {
  const [search] = useSearchParams();
  const id = search.get("id");
  const [additionalInfo, setaddinfo] = useState<shoppingInfo>();
  useEffect(() => {
    const fetch = async () => {
      const data = await getRequest(`shoppingInfo/${id}`);
      if (data.err) {
        console.log(data.err);
        toast.error("Failed to fetch shopping information");
        return;
      }
      setaddinfo(data);
    };
    fetch();
  }, [search]);
  return (
    <div>
      <div
        className="px-16 flex items-start max-sm:flex-wrap space-x-10 
    max-sm:space-y-10 max-sm:space-x-0 py-6 max-sm:px-2 max-sm:py-5"
      >
        <ToastContainer />
        <div className="space-y-5">
          <h2 className="text-2xl px-3 font-bold">Shopping Information</h2>
          <table className="max-sm:w-full table-fixed">
            <tbody className="*:border-b-[1px] *:border-gray-500">
              {additionalInfo?.info &&
                [...additionalInfo?.info].map((keyval, i) => (
                  <tr
                    key={i}
                    className="*:px-5 *:py-3 max-sm:*px-0 *:text-wrap"
                  >
                    <th className="bg-gray-400/10 font-semibold w-[15rem] max-sm:w-auto">
                      {keyval.key?.toUpperCase()}
                    </th>
                    <td className="bg-gray-600/5">{keyval.value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-5">
          <h2 className="text-2xl px-3 font-bold">Additional Information</h2>
          <table className="max-sm:w-full table-fixed">
            <tbody className="*:border-b-[1px] *:border-gray-500">
              {additionalInfo?.additionalInfo &&
                additionalInfo.additionalInfo.map((keyval, i) => (
                  <tr key={i} className="*:px-5 *:py-3">
                    <th className="bg-gray-400/10 font-semibold w-[15rem] max-sm:w-auto">
                      {keyval.key?.toUpperCase()}
                    </th>
                    <td className="bg-gray-600/5">{keyval.value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShoppingInfo;
