import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Spinner from "../Icons/Spinner";
import { useNavigate } from "react-router-dom";

const Redirect = ({ link }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (link) {
      navigate(link);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spinner />
    </Box>
  );
};

export default Redirect;
