import React from "react";
import "./Offers.css";
import exclusive from "../assets/hero-image1.png";

const Offers = () => {
  const base = {
    backgroundColor: "rgb(247,247,247)",
    paddingTop: "1em",
  };
  return (
    <div style={base}>
      <div className="offers">
        <div className="offers-left">
          <h2>Exclusive</h2>
          <h2>Offers For you</h2>
          <p>Best Selling pc Parts</p>
          <button>Check Now</button>
        </div>
        <div className="offers-right">
          <img src={exclusive} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Offers;
