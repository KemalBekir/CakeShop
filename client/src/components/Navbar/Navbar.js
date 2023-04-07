import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuthContext();
  const [active, setActive] = useState(false);
  const isAdmin = user.email === "peter@abv.bg";

  const handleClick = () => {
    setActive(!active);
  };
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo-container">
          <span className="nav-logo">
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <img
                className="logo"
                src="/assets/logo-no-background.svg"
                alt="company logo"
                onClick={()=> setActive(false)}
              />
            </Link>
          </span>
        </div>
        <div className={`nav-list-container `}>
          <ul className={`${active ? "active" : "deactive"}`}>
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} to="/" onClick={()=> setActive(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/catalogue"
                onClick={()=> setActive(false)}
              >
                Catalogue
              </Link>
            </li>{" "}
            <li>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/catalogue/search"
                onClick={()=> setActive(false)}
              >
                Search
              </Link>
            </li>
            {user.email ? (
              <div className="user">
                <li>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/profile"
                    onClick={()=> setActive(false)}
                  >
                    Profile
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/create"
                      onClick={()=> setActive(false)}
                    >
                      Create
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/logout"
                    onClick={()=> setActive(false)}
                  >
                    Logout
                  </Link>
                </li>
              </div>
            ) : (
              <div className="guest">
                <li>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/login"
                    onClick={()=> setActive(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/register"
                    onClick={()=> setActive(false)}
                  >
                    Register
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
        <div className="burger-menu" onClick={handleClick}>
          {active ? (
            <FontAwesomeIcon icon={faXmark} />
            
          ) : (
            <FontAwesomeIcon icon={faBars} />

          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
