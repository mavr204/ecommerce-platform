import React, { useContext, useEffect } from "react";
import "./Snackbar.css";
import { UserContext } from "../../Context/UserContext";

const Snackbar = () => {
  const {
    snackbarOpen,
    message,
    messageType,
    handleSnackbarClose,
    setSnackbarOpen,
  } = useContext(UserContext);
  const handleClose = () => {
    setSnackbarOpen(false);
    handleSnackbarClose();
  };

  useEffect(() => {
    if (snackbarOpen) {
      setTimeout(handleClose, 2000);
    }
    console.log();
  }, [snackbarOpen]);

  return (
    <div className={`${messageType} ${snackbarOpen ? "snackbar" : "d-none"}`}>
      <div className={`message-snack ${messageType}`}>{message}</div>
      <div className="btn-container-snack">
        <button className="close-btn-snack" onClick={handleClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
