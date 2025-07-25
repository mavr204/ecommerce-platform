import React, { useState, useEffect, useContext } from "react";
import cartIcon from "../assets/cart_icon.png";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";
import UserService from "../Data/UserService";

export const Navbar = () => {
  const { count } = useContext(CartContext);
  const { isLoggedIn, setLoggedIn } = useContext(UserContext);
  const [menu, setMenu] = useState("Home");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const navbar = document.getElementById("navCollapse");
      const hamIcon = document.getElementById("hamIcon");
      if (
        window.innerWidth < 700 &&
        hamIcon.classList.contains("logo-container")
      ) {
        navbar.classList.add("collapse");
        hamIcon.classList.remove("logo-container");
        hamIcon.classList.add("navbar-toggler-icon");
      } else if (
        hamIcon.classList.contains("navbar-toggler-icon") &&
        window.innerWidth >= 700
      ) {
        navbar.classList.remove("collapse");
        hamIcon.classList.add("logo-container");
        hamIcon.classList.remove("navbar-toggler-icon");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const logOut = async () => {
    await UserService.logout();
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex flex-column">
      <div className="container-fluid justify-content-around">
        <div className="justify-content-center">
          <div>
            <button
              className="nav-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navCollapse"
              aria-controls="navCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => {
                const navbarToggler = document.getElementById("navCollapse");
                navbarToggler.classList.toggle("collapse");
              }}
            >
              <span className="logo-container" id="hamIcon"></span>
            </button>
          </div>
        </div>
        <div>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            Ecommerce
          </Link>
        </div>

        <div style={{ width: "50%" }}>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
        <Link to="/cart">
          <div className="cart">
            <img
              src={cartIcon}
              alt="cart"
              title="cart"
              style={{ width: "80%" }}
            />
            <div className="nav-cart-count">{count}</div>
          </div>
        </Link>

        <div className="login">
          {!isLoggedIn ? (
            <Link to="/login">
              <button>Log in</button>
            </Link>
          ) : (
            <button onClick={logOut}>Log Out</button>
          )}
        </div>
      </div>

      <div style={{ width: "100%" }} className="d-flex justify-content-center">
        <div id="navCollapse">
          <ul className="collapsable-nav">
            <li
              onClick={() => {
                setMenu("Home");
              }}
            >
              <Link style={{ textDecoration: "none", color: "black" }} to="/">
                Home
              </Link>
              <hr className={menu === "Home" ? "active" : ""} />
            </li>
            <li
              onClick={() => {
                setMenu("Pre-Built");
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/pre-built"
              >
                Pre-Built
              </Link>
              <hr className={menu === "Pre-Built" ? "active" : ""} />
            </li>
            <li
              onClick={() => {
                setMenu("Parts");
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/parts"
              >
                Parts
              </Link>
              <hr className={menu === "Parts" ? "active" : ""} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
