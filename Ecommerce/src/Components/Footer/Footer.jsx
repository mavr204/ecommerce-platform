import React from "react";
import "./Footer.css";
import logo from "../assets/react.svg";
import instaIcon from "../assets/Insta-logo.png";
import facebookIcon from "../assets/fb-logo.png";
import xIcon from "../assets/X-logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={logo} alt="logo" />
        <p>Ecommerce</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contacts</li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
          <img src={instaIcon} alt="Instagram" />
          <img src={facebookIcon} alt="Facebook" />
          <img src={xIcon} alt="X" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
