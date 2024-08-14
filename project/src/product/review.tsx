import { useEffect, useState } from "react";
import { reviewStats } from "../utils/schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import CommentModal from "./commentModal";
import { review } from "../utils/schema2";
import { getRequest } from "../utils/handleApi";
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../utils/authentication";

function Review() {
  const [statsVal, setStatsVal] = useState<reviewStats>({
    totalReviews: 0,
    star_5: 0,
    star_4: 0,
    star_3: 0,
    star_2: 0,
    star_1: 0,
  });
  const [avgRating, setAvgRating] = useState<number>();
  const [reviews, setReviews] = useState<review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search] = useSearchParams();
  const id = search.get("id");
  const openModal = () => {
    if (getToken() === "") {
      toast.error("You need to be logged in write the view reviews");
      return;
    }
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRequest(`review/${id}`);
        if (data?.err) {
          console.error("API Error:", data.err);
          toast.error("An error occurred while fetching reviews");
          return;
        }

        // Initialize stats
        let stats = {
          star_1: 0,
          star_2: 0,
          star_3: 0,
          star_4: 0,
          star_5: 0,
          totalReviews: 0,
        };

        // Process reviews and update stats
        data.forEach((r: review) => {
          if (r.rating === 5) stats.star_5 += 1;
          else if (r.rating === 4) stats.star_4 += 1;
          else if (r.rating === 3) stats.star_3 += 1;
          else if (r.rating === 2) stats.star_2 += 1;
          else stats.star_1 += 1;

          stats.totalReviews += 1;
        });

        // Calculate average rating
        const avgRating =
          stats.totalReviews > 0
            ? data.reduce(
                (acc: number, rate: review) =>
                  acc + (rate.rating === undefined ? 0 : rate.rating),
                0
              ) / stats.totalReviews
            : 0;

        // Update state
        setReviews(data);
        setStatsVal(stats);
        setAvgRating(avgRating);
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("An error occurred while fetching reviews");
      }
    };

    fetchData();
  }, [search]); // Add id as a dependency if it changes

  return (
    <div className="px-16 flex max-sm:flex-wrap space-x-5 py-6 space-y-10 max-sm:px-4 max-sm:py-5">
      <ToastContainer />
      <div className="max-sm:w-full">
        <div className="w-[22rem] max-sm:w-full p-10 space-y-6 shadow-2xl rounded-md">
          <button
            onClick={openModal}
            className="w-full p-2.5 bg-black/40 hover:bg-black/50 active:bg-black/30 rounded-md font-semibold"
          >
            Write a review
          </button>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                color={i < 3 ? "yellow" : "gray"}
              />
            ))}
            <p className="text-lg px-1">
              {avgRating}{" "}
              <span className="text-xs text-gray-400">
                / {reviews.length} reviews
              </span>
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-gray-400 flex items-center space-x-2">
              <p>5</p>
              <FontAwesomeIcon icon={faStar} color="gray" size="xs" />
              <div className="w-full bg-gray-400/40 flex h-2.5 rounded-full">
                <div
                  className="rounded-full bg-yellow-300"
                  style={{
                    width: `${
                      (statsVal.star_5 / statsVal.totalReviews) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="text-gray-400 flex items-center space-x-2">
              <p>4</p>
              <FontAwesomeIcon icon={faStar} color="gray" size="xs" />
              <div className="w-full bg-gray-400/40 flex h-2.5 rounded-full">
                <div
                  className="rounded-full bg-yellow-300"
                  style={{
                    width: `${
                      (statsVal.star_4 / statsVal.totalReviews) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="text-gray-400 flex items-center space-x-2">
              <p>3</p>
              <FontAwesomeIcon icon={faStar} color="gray" size="xs" />
              <div className="w-full bg-gray-400/40 flex h-2.5 rounded-full">
                <div
                  className="rounded-full bg-yellow-300"
                  style={{
                    width: `${
                      (statsVal.star_3 / statsVal.totalReviews) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="text-gray-400 flex items-center space-x-2">
              <p>2</p>
              <FontAwesomeIcon icon={faStar} color="gray" size="xs" />
              <div className="w-full bg-gray-400/40 flex h-2.5 rounded-full">
                <div
                  className="rounded-full bg-yellow-300"
                  style={{
                    width: `${
                      (statsVal.star_2 / statsVal.totalReviews) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="text-gray-400 flex items-center space-x-2">
              <p>1</p>
              <FontAwesomeIcon icon={faStar} color="gray" size="xs" />
              <div className="w-full bg-gray-400/40 flex h-2.5 rounded-full">
                <div
                  className="rounded-full bg-yellow-300"
                  style={{
                    width: `${
                      (statsVal.star_1 / statsVal.totalReviews) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-6 max-sm:px-0 space-y-2">
        {reviews.map((review, i) => {
          return (
            <div key={i} className="flex items-start space-x-2 py-3">
              <div>
                <div
                  className="w-[1.8rem] h-[1.8rem] rounded-full flex 
                items-center justify-center bg-gray-400/50"
                >
                  {review.user?.username[0].toUpperCase()}
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm">{review.user?.username}</p>
                <p className="text-sm text-gray-400">{review.comment}</p>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && <CommentModal onClose={closeModal} />}
    </div>
  );
}

export default Review;
