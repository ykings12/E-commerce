import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color }) => {
  console.log("Rating value:", value); // Log the received value

  // const fullStars = Math.floor(value);
  // const halfStars = value - fullStars > 0.5 ? 1 : 0;
  // const emptyStar = 5 - fullStars - halfStars;

  // Ensure the value is within the range of 0 to 5
  const clampedValue = Math.min(Math.max(value/10, 0), 5);

  const fullStars = Math.floor(clampedValue); // Full stars (e.g., 4.75 => 4)
  const remainder = clampedValue - fullStars; // Decimal part (e.g., 4.75 => 0.75)
  const halfStars = remainder >= 0.5 ? 1 : 0; // Half star if decimal part is 0.5 or more
  const emptyStar = 5 - fullStars - halfStars;

  // Prepare to render stars based on full, half, and empty stars
  const starArray = [];

  // Render full stars
  for (let i = 0; i < fullStars; i++) {
    starArray.push(<FaStar key={`full-${i}`} className={`text-${color} ml-1`} />);
  }

  // Render half star if applicable
  if (halfStars === 1) {
    starArray.push(<FaStarHalfAlt key="half" className={`text-${color} ml-1`} />);
  }

  // Calculate empty stars to complete up to a total of 5 stars
  const totalStars = 5;
  const remainingStars = totalStars - fullStars - halfStars;
  for (let i = 0; i < remainingStars; i++) {
    starArray.push(<FaRegStar key={`empty-${i}`} className={`text-${color} ml-1`} />);
  }

  console.log(starArray);

  return (
    <div className="flex items-center">
      {starArray}
      <span className={`rating-text ml-2 text-${color}`}>{text}</span>
    </div>
  //   <div className="flex items-center">
  //     {/* ratings  */}
  //   {[...Array(fullStars)].map((_, index) => (
  //     <FaStar key={index} className={`text-${color} ml-1`} />
  //   ))}

  //   {halfStars === 1 && <FaStarHalfAlt className={`text-${color} ml-1`} />}
  //   {[...Array(emptyStar)].map((_, index) => (
  //     <FaRegStar key={index} className={`text-${color} ml-1`} />
  //   ))}

  //   <span className={`rating-text ml-{2rem} text-${color}`}>
  //     {text && text}
  //   </span>
  // </div>
  );
};

Ratings.defaultProps = {
  color: "yellow-500",
};

export default Ratings;
