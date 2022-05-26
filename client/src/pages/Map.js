import * as React from "react";
import Map, { Marker, Popup, FullscreenControl } from "react-map-gl";
// import MapRender from "../components/Map/index";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibGl6bWFja2xlIiwiYSI6ImNsMzlvZmh5bTBibWEzaW82aXdheTl2MGgifQ.EcFXGRHbQRf-CKEU3YBUwA";

const reviews = [
  {
    longitude: 115.8613,
    latitude: -31.9523,
  },
];

export default function MapPage() {
  const [viewState, setViewState] = React.useState({
    latitude: -31.953512,
    longitude: 115.857048,
    zoom: 14,
  });

  const [popupCoordinates, setPopupCoordinates] = React.useState(null);

  return (
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
          <div
            onClick={(event) => {
              event.stopPropagation();
              console.log("MARKER", event);
              // TODO: display review
            }}
            style={{
              background: "red",
              height: 100,
              width: 100,
            }}
          >
            <button>View Review</button>
            <button>Add Review</button>
          </div>
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
          <input />
          <textarea />
        </Popup>
      )}
      <FullscreenControl />
    </Map>
  );
}
