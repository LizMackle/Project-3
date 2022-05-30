import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { QUERY_REVIEWS } from "../../utils/queries";
// import { render } from "react-dom";
// import StarRating from "../Stars/Stars";
// import { Popover, PopoverHeader, PopoverBody } from "react-bootstrap";
import{ Popup } from "react-map-gl";



export default function ViewSidebar() {
  const { data } = useQuery(QUERY_REVIEWS);
    const dataReviews = data?.reviews || [];
    const [displayReviews, setDisplayReviews] = useState({

    })
  
  return (
    dataReviews && (
      <Popup
        tipSize={10}
        anchor="top"
        longitude={dataReviews.longitude}
        latitude={dataReviews.latitude}
        title={dataReviews.title}
        content={dataReviews.content}
        user={dataReviews.username}
        stars={dataReviews.stars}
        closeOnClick={false}
        onClose={() => this.setState({ popupInfo: null })}
      >
        </Popup>
    )
  );
}
