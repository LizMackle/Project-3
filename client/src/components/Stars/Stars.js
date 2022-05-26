import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Stars.css";
const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            ></input>
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#FFC107" : "#E4E5E9"}
              size={15}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};
export default StarRating;
