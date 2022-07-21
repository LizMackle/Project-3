import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_REVIEWS } from "../utils/queries";
import Map, { Marker, Popup, FullscreenControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import AddReview from "../components/Review/AddSidebar";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";

export default function MapPage() {
  const { data } = useQuery(QUERY_REVIEWS);
  const reviews = data?.reviews || [];
  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1.8,
  });

  const [review, setReview] = useState(null);

  const navigate = useNavigate();
  console.log(data);

  const [displayform, setDisplayForm] = useState(false);

  return (
    <>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100vw",
          height: "100vh",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onClick={(event) => {
          console.log("MAP", event);
          setDisplayForm(true);
        }}
      >
        {reviews.map((review) => (
          <Marker
            key={review._id}
            style={{ cursor: "pointer" }}
            latitude={review.latitude}
            longitude={review.longitude}
          >
            <img
              onClick={(e) => {
                e.stopPropagation();
                setReview(review);
              }}
              src="./pin5.png"
              alt="red pointer"
              style={{
                background: "none",
                border: "transparent",
                cursor: "hand",
                width: "27px",
                height: "37px",
              }}
            ></img>
          </Marker>
        ))}

        {review !== null && (
          <Popup
            latitude={review.latitude}
            longitude={review.longitude}
            anchor="top"
            onClose={() => setReview(null)}
            closeOnClick={false}
          >
            <div className="reviewContainer text-center">
              <div className="reviewTitle">
                <h6
                  style={{
                    fontSize: "22px",
                    fontFamily: "Montserrat",
                    paddingTop: "10px",
                  }}
                >
                  {review.title}
                </h6>
              </div>
              <hr></hr>

              <div className="lon-lat">
                <h6
                  style={{
                    fontSize: "13px",
                    fontFamily: "Montserrat",
                  }}
                >
                  {review.latitude} | {review.longitude}
                </h6>
              </div>

              <div
                className="reviewContent"
                style={{
                  fontSize: "14px",
                  fontFamily: "Montserrat",
                }}
              >
                {review.content}
              </div>

              <div
                className="starRating"
                style={{ paddingTop: "10px", paddingLeft: "60px" }}
              >
                <ReactStars value={review.stars} size={24} color2={"#ffd700"} />
              </div>
              <hr></hr>
            </div>
          </Popup>
        )}

        <FullscreenControl />
      </Map>

      {displayform && (
        <AddReview
          closeSidebar={() => setDisplayForm(false)}
          // closes the sidebar when click on x
          onSubmit="review submitted👍"
        ></AddReview>
      )}

      <button
        style={{
          position: "fixed",
          top: "10px",
          right: "50px",
        }}
        className="btn px-2 btn-dark text-white"
        onClick={() => navigate(-2)}
      >
        &larr; Go back
      </button>
    </>
  );
}
