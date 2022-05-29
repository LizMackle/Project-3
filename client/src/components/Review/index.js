// import React from "react";
// import { Link } from "react-router-dom";

// const ReviewList = ({
//   reviews,
//   showLatitude = true,
//   showLongitude = true,
//   title,
//   showTitle = true,
//   content,
//   showContent = true,
//   username = true,
//   showUsername = true,

//   showStars = true,
// }) => {
//   if (!reviews.length) {
//     return <h3>No reviews yet!</h3>;
//   }

//   return (
//     <div>
//       {}

//       {showTitle && <h3>{title}</h3>}
//       {reviews &&
//         reviews.map((review) => (
//           <div key={review.reviewId} className="card mb-3">
//             <h4 className="card-header bg-primary text-light p-2 m-0">
//               {showUsername ? (
//                 <Link
//                   className="text-light"
//                   to={`/reviews/${review.reviewAuthor}`}
//                 >
//                   {review.reviewAuthor} <br />
//                   <span style={{ fontSize: "1rem" }}>
//                     Added this this review on {review.createdAt}
//                   </span>
//                 </Link>
//               ) : (
//                 <>
//                   <span style={{ fontSize: "1rem" }}>
//                     You Added this review on {review.createdAt}
//                   </span>
//                 </>
//               )}
//             </h4>
//             <div className="card-body bg-light p-2">
//               <p>{review.reviewContent}</p>
//             </div>
//             <Link
//               className="btn btn-primary btn-block btn-squared"
//               to={`/reviews/${review.reviewId}`}
//             ></Link>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default ReviewList;
