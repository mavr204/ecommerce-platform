import React from "react";
import "./CoolButton.css";
import { useNavigate } from "react-router-dom";

const CoolButton = ({ name, ChildComponent }) => {
  const navigate = useNavigate();
  return (
    <button
      className="coolButton d-flex justigy-content-center align-items-center"
      onClick={() => navigate("/")}
    >
      <ChildComponent />
      <p className="m-0 mt-1">{name}</p>
    </button>
  );
};

export default CoolButton;
