import * as React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_REVIEWS } from "../utils/queries";
import Map, { Marker, Popup, FullscreenControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import AddSidebar from "../components/Review/AddSidebar";
import ViewSidebar from "../components/Review/ViewSidebar";
import { useNavigate } from "react-router-dom";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibGl6bWFja2xlIiwiYSI6ImNsMzlvZmh5bTBibWEzaW82aXdheTl2MGgifQ.EcFXGRHbQRf-CKEU3YBUwA";

export default function MapPage() {
  const { data } = useQuery(QUERY_REVIEWS);
  const reviews = data?.reviews || [];
  const [viewState, setViewState] = React.useState({
    latitude: 0,
    longitude: 0,
    zoom: 1.8,
  });

  const navigate = useNavigate();
  console.log(data);

  const [popupCoordinates, setPopupCoordinates] = React.useState(null);

  const [displayreview, setDisplayReview] = React.useState(false);

  const [displayform, setDisplayForm] = React.useState(false);

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
            longitude={review.longitude}
            latitude={review.latitude}
            color="red"
          ></Marker>
        ))}
        {popupCoordinates !== null && (
          <Popup
            longitude={popupCoordinates.longitude}
            latitude={popupCoordinates.latitude}
            anchor="bottom"
            onClose={() => setPopupCoordinates(null)}
            closeOnClick={false}
          >
            {/* <div>TITLE</div> */}
            <button
              className="btn btn-sm bg-dark text-white shadow-lg "
              style={{
                cursor: "pointer",
                borderRadius: "4px",
                marginRight: "5px",
              }}
              onClick={() => {
                setDisplayReview(true);
              }}
            >
              View Review
            </button>
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
