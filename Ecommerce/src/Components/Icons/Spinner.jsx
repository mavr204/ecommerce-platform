import React from "react";

const Spinner = ({ width = "70px" }) => {
  return (
    <div
      className="spinner-grow"
      style={{ width: width, height: width, background: "" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
