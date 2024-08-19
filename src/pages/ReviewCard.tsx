import { FaTrash } from "react-icons/fa";
import { Review } from "../types/types";
import RatingsComponent from "../components/ratings";

const ReviewCard = ({
  review,
  userId,
  handleDeleteReview,
}: {
  userId?: string;
  review: Review;
  handleDeleteReview: (reviewId: string) => void;
}) => (
  <div className="review">
    <RatingsComponent value={review.rating} />
    <p>{review.comment}</p>
    <div>
      <img src={review.user.photo} alt="User" />
      <small>{review.user.name}</small>
    </div>
    {userId === review.user._id && (
      <button onClick={() => handleDeleteReview(review._id)}>
        <FaTrash />
      </button>
    )}
  </div>
);

export default ReviewCard;
