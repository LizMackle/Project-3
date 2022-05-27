import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto text-dark p-2 bg-white">
      <div className="container text-center mb-2">
        {location.pathname !== "/" && (
          <button
            className="btn btn-dark mb-2 text-white"
            onClick={() => navigate(-1)}
          >
            &larr; Go back
          </button>
        )}
        <h5
          style={{
            fontSize: "0.9rem",
            fontFamily: "Montserrat",
          }}
        >
          &copy; {new Date().getFullYear()} - WanderView🤍
        </h5>
        <div
          className="About-page"
          style={{
            fontSize: "0.9rem",
            fontFamily: "Montserrat",
            color: "black",
          }}
        >
          <a href="/about">About us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
