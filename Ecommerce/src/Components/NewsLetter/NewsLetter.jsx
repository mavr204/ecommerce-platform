import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  const base = {
    backgroundColor: "#f7f7f7",
    paddingBlock: "3em",
  };
  return (
    <div style={base}>
      <div className="newsletter">
        <h3>Get Exclusive Offers on your Email</h3>
        <p>Subscribe to our newsletter to stay updated</p>
        <div className="news-form">
          <input type="text" placeholder="i.e. yourname@example.com" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
