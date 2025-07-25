import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HamburgerIcon from "../Icons/HamburgerIcon";
import "./OffcanvasNav.css";
import { UserContext } from "../../Context/UserContext";
import UserService from "../Data/UserService";

const OffcanvasNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const lastScrollTopRef = useRef(0);
  const { isLoggedIn, setLoggedIn, isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;
      const navbar = document.getElementById("navbar");
      if (
        currentScrollTop > lastScrollTopRef.current &&
        navbar.classList.contains("nav-show")
      ) {
        document.getElementById("navbar").classList.remove("nav-show");
      } else if (
        currentScrollTop < lastScrollTopRef.current &&
        !navbar.classList.contains("nav-show")
      ) {
        document.getElementById("navbar").classList.add("nav-show");
      }
      lastScrollTopRef.current = currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const logOut = async () => {
    await UserService.logout();
    await isAdmin();
    setLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav
        className="navigation-bar nav-show"
        style={{ width: "80%" }}
        id="navbar"
      >
        <div className="container-nav">
          <div className="logo">Ecommerce</div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <HamburgerIcon />
          </div>
          <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/addproduct"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/getorders"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  View Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/getusers"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Customers
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="nav-buttons" style={{ paddingLeft: "20px" }}>
            {!isLoggedIn ? (
              <NavLink
                to="/login"
                style={({ isActive }) => ({
                  cursor: "pointer",
                  textDecoration: "none",
                  transform: isActive ? "scale(1.1)" : "none",
                })}
              >
                <button className="p-1 pagination-button login-btn">
                  Log in
                </button>
              </NavLink>
            ) : (
              <button
                onClick={logOut}
                className="p-1 pagination-button login-btn"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </nav>
      {showNavbar && (
        <div
          className="offcanvas-backdrop"
          onClick={handleShowNavbar}
          style={{ zIndex: "1" }}
        ></div>
      )}
    </>
  );
};

export default OffcanvasNavbar;
