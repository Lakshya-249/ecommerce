import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postRequest } from "../utils/handleApi";

function CommentModal({ onClose }: { onClose: () => void }) {
  const [search] = useSearchParams();
  const id = search.get("id");
  const [comment, setComment] = useState<string>("");
  const [star, setstar] = useState<number>(0);
  const handleStar = (num: number) => {
    setstar(num + 1);
  };
  const handleSubmit = async () => {
    toast("Processing request...");
    const data = await postRequest("review", {
      comment: comment,
      rating: star,
      productId: id,
    });
    if (data?.err) {
      toast.error("Failed to add comment");
      return;
    }
    toast.success("Comment added successfully");
    onClose();
  };
  return (
    <div>
      <div className="fixed inset-0 h-full w-full flex z-50 p-4 justify-center items-center backdrop-blur-sm bg-black/30">
        <ToastContainer />
        <div className="p-5 bg-inherit mx-auto rounded-md w-[30rem] shadow-sm shadow-white space-y-2">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">Add a Comment</h3>
            <div className="space-x-3">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  onClick={() => handleStar(i)}
                  className="hover:cursor-pointer"
                  key={i}
                  icon={faStar}
                  color={i < star ? "yellow" : "gray"}
                />
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            className="w-full resize-none h-28 p-3 rounded-md border bg-inherit border-gray-500 focus:outline-none"
            placeholder="Write your comment..."
          />
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={handleSubmit}
              type="submit"
              className="text-white bg-black hover:bg-black/25 active:bg-black/50 px-4 py-2 rounded-md"
            >
              Submit
            </button>
            <button
              className="hover:text-gray-400 px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
