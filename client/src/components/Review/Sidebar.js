import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import StarRating from "../../components/Stars/Stars";
import { ADD_REVIEW } from "../../utils/mutations";
import { QUERY_ME, QUERY_REVIEWS } from "../../utils/queries";
import Auth from '../../utils/auth';

export default function Sidebar(props) {
  function close() {
    props.closeSidebar();
  };
// ADD REVIEW
  const [reviewTitle, setReviewTitle] = useState('');

  const [reviewContent, setReviewContent] = useState('');

  const [addReview, { error }]= useMutation(ADD_REVIEW.definitions, {
    
    update(cache, { data: addReview }){
      try {
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS});

        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [addReview, ...reviews]}
        });
      } catch (e) {
        console.error(e);
      }
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, reviews: [...me.reviews, addReview] } },
      });
    }
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addReview ({
        variables: {
          reviewContent,
          reviewAuthorId: Auth.data.username,
        }
      });
      setReviewContent('');
    } catch (err) {
      console.error(err);
    }

  };



  return (
    <form
    onSubmit={handleFormSubmit}
    >
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "35vh",
        height: "100vh",
        backgroundColor: "white",
        boxShadow: "2px 2px 10px grey",
        zIndex: 10,
      }}
    >
      <input
        className="review-title"
        placeholder="Title"
        style={{
          height: "32px",
          width: "90%",
          padding: "5px",
        }}
      ></input>
      <button
        className="btn p-1 bg-dark text-white"
        onClick={close}
        style={{
          cursor: "pointer",
          position: "absolute",
          right: "2px",
          borderRadius: "4px",
        }}
      >
        X
      </button>
      <textarea
        className="review-text"
        placeholder="Review"
        style={{
          marginTop: "5px",
          marginBottom: "10px",
          height: "300px",
          width: "100%",
          padding: "5px",
        }}
      ></textarea>
      <div className="rating-box" style={{ paddingLeft: "5px" }}>
        <StarRating />
      </div>
      <button
        className="btn p-1 bg-dark text-white"
        style={{
          cursor: "pointer",
          alignContent: "center",
          width: "100%",
          marginTop: "10px",
          borderRadius: "0px",
        }}
      >
        Submit
      </button>
      {/* <div>
        <img
          src="https://i.ibb.co/nzDNnYg/clipart.png"
          alt=""
          style={{ width: "90%", height: "90%", marginLeft: "10px" }}
        ></img>
      </div> */}
    </div>
    </form>
  );
}
