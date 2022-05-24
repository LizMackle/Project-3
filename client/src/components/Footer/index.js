import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto text-dark p-4">
      <div className="container text-center mb-3">
        {/* {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )} */}
        <h5 style={{ fontSize: "1.2rem", fontFamily: "Montserrat" }}>
          &copy; {new Date().getFullYear()} - Travel Map🤍
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
