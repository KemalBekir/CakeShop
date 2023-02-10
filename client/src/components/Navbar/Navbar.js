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
              />
            </Link>
          </span>
        </div>
        <div className={`nav-list-container `}>
          <ul className={`${active ? "active" : "deactive"}`}>
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/catalogue"
              >
                Catalogue
              </Link>
            </li>{" "}
            <li>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/catalogue/search"
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
                  >
                    Profile
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/create"
                    >
                      Create
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/logout"
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
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/register"
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
