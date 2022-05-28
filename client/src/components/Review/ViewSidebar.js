import React from "react";
import StarRating from "../Stars/Stars";

export default function ViewSidebar(props) {
  function close() {
    props.closeViewSidebar();
  }
  return (
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
        className="view-review-title"
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
        className="view-review-text"
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
        <StarRating className="view-review-stars" />
      </div>
    </div>
  );
}
