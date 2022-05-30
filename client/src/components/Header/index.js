import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();

    navigate("/login");
  };

  return (
    <header className="text-dark mb-5 display-flex align-center">
      <div className="container w-100 flex-column justify-space-between-lg justify-center align-center text-center">
        {/* <Link className="text-dark" to="/"> */}
        <h1
          className="text-dark m-0 pt-5"
          id="header-title"
          style={{ fontSize: "3.1rem", fontFamily: "Montserrat" }}
        >
          WanderView
        </h1>
        <p
          className="m-0"
          id="sub-title"
          style={{
            fontSize: "1.1rem",
            fontWeight: "700",
            fontFamily: "Montserrat",
            padding: "1rem",
          }}
        >
          📍 Wander the world, pin a destination & share your review!
        </p>
        <div>
          {/* {Auth.loggedIn() ? (
            <button className="btn btn-lg btn-dark m-2" onClick={logout}>
              LOGOUT
            </button>
          ) : ( */}
          <>
            <Link className="btn btn-lg btn-dark m-2 text-white" to="/login">
              LOGIN
            </Link>
            <Link className="btn btn-lg btn-dark m-2 text-white" to="/signup">
              SIGNUP
            </Link>
          </>
        </div>
      </div>
    </header>
  );
};

export default Header;
