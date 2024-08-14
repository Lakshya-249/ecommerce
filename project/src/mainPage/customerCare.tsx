import { useState } from "react";
import { postRequest } from "../utils/handleApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerCare() {
  const [text, setText] = useState<string>("");
  const [sub, setSubject] = useState<string>("");

  const handeSubmit = async () => {
    toast("Processing Request");
    const data = await postRequest("sendFeedback", {
      subject: sub,
      text: text,
    });
    if (data?.err) {
      console.log(data.err);
      toast.error("Failed to send feedback");
      return;
    }
    setText("");
    setSubject("");
    toast.success(data.message);
  };

  return (
    <div className="w-[50%] max-sm:w-full pb-5 space-y-5">
      <p className="text-4xl font-semibold">Customer Support</p>
      <ToastContainer />
      <p>
        Contact Number:{" "}
        <span className="text-blue-400">+91 99106 40986, +91 93102 54918</span>
      </p>
      <div className="space-y-4">
        <div className="space-y-2">
          <p>Subject</p>
          <input
            value={sub}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter..."
            type="text"
            className="w-full px-6 py-2 rounded-lg border bg-inherit border-gray-500"
          />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your query here..."
          className="w-full h-[15rem] border border-gray-500 
        px-6 py-5 rounded-xl resize-none bg-black/10"
        />
        <div className="flex space-x-5">
          <button
            onClick={handeSubmit}
            className="px-10 py-2 rounded-xl bg-gray-400/10 
      hover:bg-gray-400/15 active:bg-black/10 "
          >
            Send email
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerCare;
