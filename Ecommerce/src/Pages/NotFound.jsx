import React from "react";
import { Container } from "@mui/material";
import NotFoundImage from "../Components/assets/NotFound.svg";
import CoolButton from "../Components/Icons/CoolButton";
import HomeIcon from "@mui/icons-material/Home";

const NotFound = () => {
  return (
    <div className="d-flex flex-column m-4 gap-5">
      <Container maxWidth="sm">
        <img src={NotFoundImage} alt="" />
      </Container>
      <div className="w-100 d-flex justify-content-center">
        <CoolButton name={"Go Home"} ChildComponent={HomeIcon}>
          Go Home
        </CoolButton>
      </div>
    </div>
  );
};

export default NotFound;
