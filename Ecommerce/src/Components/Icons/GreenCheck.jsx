import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

const GreenCheck = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="green" />
      <path
        d="M9 16.2l-4.2-4.2 1.4-1.4L9 13.4l7.8-7.8 1.4 1.4L9 16.2z"
        fill="white"
      />
    </SvgIcon>
  );
};

export default GreenCheck;
