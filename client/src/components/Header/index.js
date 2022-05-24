import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import Typewriter from "typewriter-effect";
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
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        {/* <Link className="text-dark" to="/"> */}
        <h1
          className="text-dark m-0"
          style={{ fontSize: "3.5rem", fontFamily: "Montserrat" }}
        >
          Travel Map
        </h1>
        {/* <h1>
          <Typewriter
            options={{
              strings: ["Welcome to my Portfolio!"],
              autoStart: true,
              loop: true,
            }}
          />
        </h1> */}
        {/* </Link> */}
        <p
          className="m-0"
          style={{
            fontSize: "1.1rem",
            fontWeight: "700",
            fontFamily: "Montserrat",
            padding: "1rem",
          }}
        >
          📍 Pin a location & share your review!
        </p>
        <div>
          {Auth.loggedIn() ? (
            <button className="btn btn-lg btn-dark m-2" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="btn btn-lg btn-dark m-2" to="/login">
                LOGIN
              </Link>
              <Link className="btn btn-lg btn-dark m-2" to="/signup">
                SIGNUP
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
