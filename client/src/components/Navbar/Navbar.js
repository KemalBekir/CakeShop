import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo-container">
          <span className="nav-logo">
            <img
              className="logo"
              src="/assets/logo-no-background.svg"
              alt="company logo"
            />
            {/* <Link
          style={{ textDecoration: "none", color: "white", width: "35%" }}
          to="/"
          >
          Cake Shop
        </Link> */}
          </span>
        </div>
        <div className="nav-list-container">
          <ul>
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/catalog"
              >
                Catalogue
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/catalog/search"
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
                <li>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/create"
                  >
                    Create
                  </Link>
                </li>
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
      </div>
    </nav>
  );
};

export default Navbar;
