import React, { createContext, useEffect, useState } from "react";
import UserService from "../Components/Data/UserService";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleShowSnackbar = (message, messageType) => {
    setMessage(message);
    setMessageType(messageType);
    setSnackbarOpen(true);
  };

  const checkUser = async () => {
    try {
      const response = await UserService.loginCheck();
      return response.data;
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  };

  const isAdmin = async () => {
    try {
      const response = await UserService.isAdmin();
      return response.data;
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const loggedIn = await checkUser();
      setLoggedIn(loggedIn);
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        snackbarOpen,
        message,
        messageType,
        isLoggedIn,

        checkUser,
        handleSnackbarClose,
        handleShowSnackbar,
        setSnackbarOpen,
        setLoggedIn,
        isAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
