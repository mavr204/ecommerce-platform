import React from "react";
import "./Hero.css";
import "./Carousel.css";
import arrowIcon from "../assets/arrow.png";
import heroImage1 from "../assets/hero-image1.png";
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  let timeOut = null;
  useEffect(() => {
    timeOut =
      autoplay &&
      setTimeout(() => {
        slide();
      }, 3000);
  });
  const slide = () => {
    setCurrentSlide((currentSlide + 1) % 3);
  };
  return (
    <div className="carousel-wrapper">
      <div
        className={
          currentSlide === 0 ? "carousel-card active-card" : "carousel-card"
        }
      >
        <div className="hero">
          <div className="hero-left">
            <h2>Deals of the Day</h2>
            <div className="subtext">
              <p>Hottest Deals</p>
              <p>For The Day</p>
            </div>
            <div
              className="hero-shop-btn"
              onMouseEnter={() => {
                setAutoplay(false);
                clearTimeout(timeOut);
              }}
              onMouseLeave={() => {
                setAutoplay(true);
              }}
            >
              <div>Shop Now</div>
              {/* <img src={arrowIcon} /> */}
            </div>
          </div>
          <div className="hero-right">
            <img src={heroImage1} />
          </div>
        </div>
      </div>
      <div
        className={
          currentSlide === 1 ? "carousel-card active-card" : "carousel-card"
        }
      >
        <div className="hero">
          <div className="hero-left">
            <h2>Deals of the Day</h2>
            <div className="subtext">
              <p>Most Popular</p>
              <p>Pre-Built Gaming Pc</p>
            </div>
            <div
              className="hero-shop-btn"
              onMouseEnter={() => {
                setAutoplay(false);
                clearTimeout(timeOut);
              }}
              onMouseLeave={() => {
                setAutoplay(true);
              }}
            >
              <div>Shop Now</div>
              {/* <img src={arrowIcon} /> */}
            </div>
          </div>
          <div className="hero-right">
            <img src={heroImage1} />
          </div>
        </div>
      </div>
      <div
        className={
          currentSlide === 2 ? "carousel-card active-card" : "carousel-card"
        }
      >
        <div className="hero">
          <div className="hero-left">
            <h2>Deals of the Day</h2>
            <div className="subtext">
              <p>Most Sold</p>
              <p>Pc Parts</p>
            </div>
            <div
              className="hero-shop-btn"
              onMouseEnter={() => {
                setAutoplay(false);
                clearTimeout(timeOut);
              }}
              onMouseLeave={() => {
                setAutoplay(true);
              }}
            >
              <div>Shop Now</div>
              {/* <img src={arrowIcon} /> */}
            </div>
          </div>
          <div className="hero-right">
            <img src={heroImage1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
