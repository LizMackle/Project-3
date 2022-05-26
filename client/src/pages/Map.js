import * as React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_REVIEWS } from "../utils/queries";
import Map, { Marker, Popup, FullscreenControl } from "react-map-gl";
// import MapRender from "../components/Map/index";
import "mapbox-gl/dist/mapbox-gl.css";
import StarRating from "../components/Stars/Stars";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibGl6bWFja2xlIiwiYSI6ImNsMzlvZmh5bTBibWEzaW82aXdheTl2MGgifQ.EcFXGRHbQRf-CKEU3YBUwA";


export default function MapPage() {
  const {data} = useQuery(QUERY_REVIEWS);
  const reviews = data?.reviews || [];
  const [viewState, setViewState] = React.useState({
    latitude: 0,
    longitude:0,
    zoom: 0,
  });

    console.log(data);

  const [popupCoordinates, setPopupCoordinates] = React.useState(null);

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
          height: "90.5vh",
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
          >
            {/* <div
              onClick={(event) => {
                event.stopPropagation();
                console.log("MARKER", event);
                // TODO: display review
              }}              
            ></div> */}
          </Marker>
        ))}
        {popupCoordinates !== null && (
          <Popup
            longitude={popupCoordinates.longitude}
            latitude={popupCoordinates.latitude}
            anchor="bottom"
            onClose={() => setPopupCoordinates(null)}
            closeOnClick={false}
          >
            <div>TITLE</div>
            <button>View Review</button>
            <button
              onClick={() => {
                setDisplayForm(true);
              }}
            >
              Add Review

            </button>
            <StarRating/>
          </Popup>
        )}
        <FullscreenControl />
      </Map>
      {displayform && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            with: 200,
            height: 200,
            backgroundColor: "white",
          }}
        >
          <input />
          <textarea />
        </div>
      )}
    </>
  );
}
