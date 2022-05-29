import React, { useState, useEffect }  from "react";
import { useQuery } from "@apollo/client";
import { QUERY_REVIEWS } from "../utils/queries";
import Map, { Marker, Popup, FullscreenControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import AddSidebar from "../components/Review/AddSidebar";
import ViewSidebar from "../components/Review/ViewSidebar";
import { useNavigate } from "react-router-dom";

export default function MapPage() {
  const { data } = useQuery(QUERY_REVIEWS);
  const reviews = data?.reviews || [];
  const [viewState, setViewState] = React.useState({
    latitude: 0,
    longitude: 0,
    zoom: 1.8,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  const navigate = useNavigate();
  console.log(data);

  const [popupCoordinates, setPopupCoordinates] = useState(null);

  const [displayreview, setDisplayReview] = useState(false);

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
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        onClick={(event) => {
          console.log("MAP", event);
          setPopupCoordinates({
            latitude: event.lngLat.lat,
            longitude: event.lngLat.lng,
          });
        }}
      >
        {reviews.map((review) => (
          <Marker
            key={reviews._id}
            style={{ cursor: "pointer" }}
            latitude={review.latitude}
            longitude={review.longitude}
            color="red"
          >
            <button 
             
             onClick={(e) => {
               e.preventDefault();
               setSelectedLocation(review.data);
              }}
             >
               <img src="./cargo.png" alt="yellow airplane"
               style={{
               background: "none",
               border: "none",
               cursor: "pointer",
               width: "15px",
               height: "15px"
              }}></img>

            </button>
          </Marker>
          
        ))}
        
        {popupCoordinates !== null && (
          <Popup
            key={reviews._id}
            latitude={popupCoordinates.latitude}
            longitude={popupCoordinates.longitude}
            anchor="top"
            onClose={() => setPopupCoordinates(null)}
            closeOnClick={false}
          >
            <div>
              <h2>
              {reviews[0].title}
              </h2>
		        <p>
		        {reviews[0].content}
		        </p>
            </div>
            <button
              className="btn btn-sm bg-dark text-white"
              style={{
                cursor: "pointer",
                borderRadius: "4px",
                marginTop: "5px",
              }}
              onClick={() => {
                setDisplayForm(true);
              }}
            >
              Add Review
            </button>
          </Popup>
        )}
        <FullscreenControl />
      </Map>

      {displayform && (
        <AddSidebar closeSidebar={() => setDisplayForm(false)}></AddSidebar>
      )}

      {displayreview && (
        <ViewSidebar
          closeViewSidebar={() => setDisplayReview(false)}
        ></ViewSidebar>
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

