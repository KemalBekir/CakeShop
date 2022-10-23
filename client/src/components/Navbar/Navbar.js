import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <nav className="nav">
      <span className="main-logo">
        <div className="main-logo-container">
          <img
            className="logo"
            src="/assets/logo-no-background.svg"
            alt="company logo"
          />
        </div>
        {/* <Link
          style={{ textDecoration: "none", color: "white", width: "35%" }}
          to="/"
        >
          Cake Shop
        </Link> */}
      </span>
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
    </nav>
  );
};

export default Navbar;
