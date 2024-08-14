import { useSearchParams } from "react-router-dom";
import { postRequest, putRequest } from "../utils/handleApi";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CorrectionWindow({ show }: { show: () => void }) {
  type MyObject = {
    [key: string]: any;
  };

  const [search] = useSearchParams();
  const [detail, setDetail] = useState<string>();
  const val: string = search.get("keyval") || "val";
  const capitalize = (str: string): string => {
    const nstr: string = str[0].toUpperCase() + str.slice(1);
    return nstr;
  };
  const handleSubmit = async () => {
    toast("Processing request...");
    // console.log({ val: detail });
    const obj: MyObject = {};
    obj[val] = detail;
    console.log(obj);

    const data =
      val !== "email"
        ? await putRequest("updateUser", obj)
        : ((await postRequest(
            `verifyUpdatedEmail?email=${detail}`,
            obj
          )) as any);

    if (data.err) {
      toast.error(data.err);
      console.error(data.err);
      return;
    }
    toast.success(data.message);
    // show();
  };
  return (
    <div>
      <div
        className="w-full h-full z-30 flex justify-center items-center fixed 
    inset-0 backdrop-blur-md backdrop-brightness-50"
      >
        <ToastContainer />
        <div className="w-[30rem] border border-gray-500 space-y-5 rounded-xl py-5 px-10">
          <p className="text-4xl font-semibold">{capitalize(val as string)}</p>
          <input
            type="text"
            onChange={(e) => setDetail(e.target.value)}
            placeholder={`Enter new ${val}...`}
            className="bg-black/20 w-full rounded-xl py-3.5 px-5"
          />
          <button
            onClick={show}
            className="w-full py-2 rounded-lg border border-gray-500
        text-white hover:bg-gray-700/10 active:bg-gray-400/10"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-full py-2 rounded-lg bg-gray-400/10
        text-white hover:bg-gray-700/10 active:bg-gray-500/10"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default CorrectionWindow;
