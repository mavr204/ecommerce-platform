import React, { useEffect, useState } from "react";
import "./Carousel.css";

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const slideLeft = () => {
    setCurrent((current + 1) % images.length);
  };

  const slideRight = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  let timeOut = null;
  useEffect(() => {
    timeOut =
      autoplay &&
      setTimeout(() => {
        slideRight();
      }, 2500);
    return () => {
      clearTimeout(timeOut);
    };
  });

  return (
    <div
      className="carousel"
      onMouseEnter={() => {
        setAutoplay(false);
        timeOut && clearTimeout(timeOut);
      }}
      onMouseLeave={() => {
        setAutoplay(true);
      }}
    >
      <div className="carousel-wrapper">
        {images.map((image, key) => (
          <div
            key={key}
            className={
              key === current ? "carousel-card active-card" : "carousel-card"
            }
          >
            <img
              src={image.image}
              className="carousel-image"
              alt={image.title}
            />
            <div className="carousel-overlay">
              <h5 className="overlay-title">{image.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
