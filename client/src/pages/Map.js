import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_REVIEWS } from "../utils/queries";
import Map, { Marker, Popup, FullscreenControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import AddSidebar from "../components/Review/AddSidebar";
import { useNavigate } from "react-router-dom";
// import StarRating, { ratingValue } from "../components/Stars/Stars";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibGl6bWFja2xlIiwiYSI6ImNsMzlvZmh5bTBibWEzaW82aXdheTl2MGgifQ.EcFXGRHbQRf-CKEU3YBUwA";

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
        mapboxAccessToken={MAPBOX_TOKEN}
        // mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
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
            color="red"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReview(review);
              }}
            >
              <img
                src="./cargo.png"
                alt="red pointer"
                style={{
                  background: "none",
                  border: "transparent",
                  cursor: "hand",
                  width: "25px",
                  height: "25px",
                }}
              ></img>
            </button>
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
            <div>
              <h5>{review.latitude}</h5>
              <h5>{review.longitude}</h5>
            </div>
            <div>
              <h6
                style={{
                  fontSize: "20px",
                  fontFamily: "Montserrat",
                }}
              >
                {review.title}
              </h6>
              <p
                style={{
                  fontSize: "14px",
                  fontFamily: "Montserrat",
                }}
              >
                {review.content}
              </p>
              {/* <p>
                {review.reviewAuthorId}
              </p>               */}
              <p>
                <h5>{review.stars}</h5>
              </p>
            </div>
          </Popup>
        )}

        <FullscreenControl />
      </Map>

      {displayform && (
        <AddSidebar
          onsubmit="console.log(review submitted👍"
          closeSidebar={() => setDisplayForm(false)}
        ></AddSidebar>
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
