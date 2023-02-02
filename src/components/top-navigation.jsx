import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./logo";
import "../styles/top-navigation.css";

function TopNavigation() {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-links">
          <Logo />

          <li className="nav-item">
            <NavLink
              to="/contactpage"
              className="nav-link"
              style={{ color: "#212121" }}
            >
              Contact Us
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/teampage"
              className="nav-link"
              style={{ color: "#212121" }}
            >
              Team
            </NavLink>
          </li>

          <li className="nav-item" href="#our-product">
            <a href="#our-product" className="nav-link current">
              Product{" "}
            </a>
          </li>

          <li className="nav-item">
            <NavLink
              to="/"
              className="nav-link"
              style={{ color: "#212121" }}
            >
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default TopNavigation;
