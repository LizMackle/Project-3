import { useMutation } from "@apollo/client";
import React, { useRef, useState, useEffect } from "react";
import { ADD_REVIEW } from "../../utils/mutations";
import { QUERY_ME, QUERY_REVIEWS } from "../../utils/queries";
import StarRating, { ratingValue } from "../Stars/Stars";

export default 

function AddSidebar(props) {
  const close = () => {
    props.closeSidebar();
  };
  const [addReview, { error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [addReview, ...reviews] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const [saveReview, SetSaveReview] = useState(true);

  const [title, setTitle] = useState('');
  
  const [content, setContent] = useState('');

  // useEffect(() => {
  //     const data = window.localStorage.getItem('reviews');
  //     if (data !== null) SetSaveReview(JSON.parse(data))
  // })

  useEffect(() => {
    window.localStorage.setItem("Wander_Views_App", JSON.stringify(saveReview));
  }, [saveReview]);

  function handleSubmit(e) {
    e.preventDefault();
    const review = { title, content }
    console.log(review);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            className="add-review-title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              height: "32px",
              width: "90%",
              padding: "5px",
            }}
          ></input>
          <button
            type="submit"
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
            required
            className="add-review-text"
            placeholder="Review"
            value={content}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              marginTop: "5px",
              marginBottom: "10px",
              height: "300px",
              width: "100%",
              padding: "5px",
            }}
          ></textarea>
          <div className="rating-box" style={{ paddingLeft: "5px" }}>
            <StarRating className="add-review-stars" />
          </div>

          {saveReview && (
            <><button
              type="submit"
              className="btn p-1 bg-dark text-white"
              style={{
                cursor: "pointer",
                alignContent: "center",
                width: "100%",
                marginTop: "10px",
                borderRadius: "0px",
              }}
              onClick={() => SetSaveReview()}
            >
              Add Review
            </button>
            <p> {title} </p>
            <p> {content} </p></>
          )}
        </div>
      </form>
    </div>
  );
}
