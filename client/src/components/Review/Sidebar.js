import React from "react";
import StarRating from "../../components/Stars/Stars";

export default function Sidebar(props) {
  function close() {
    props.closeSidebar();
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
  );
}
