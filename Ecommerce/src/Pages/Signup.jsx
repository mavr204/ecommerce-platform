import React, { useState, useRef, useEffect, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./CSS/Login.css";
import UserSignup from "../Components/SignUp/UserSignup";
import UserSignupDetails from "../Components/SignUp/UserSignupDetails";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    pin: "",
    landmark: "",
    city: "",
    state: "",
    houseNumber: "",
    password: "",
  });
  const signInRef = useRef(null);
  const [next, setNext] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const { handleShowSnackbar, checkUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userExists = await checkUser();

      if (userExists) {
        navigate("404");
      } else {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (signInRef.current) {
      signInRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Render loading spinner if loading state is true
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <div className="container-edit-back">
        <div className="container-user-edit">
          <div className="profile-header">
            <h2 className="text">Signup</h2>
          </div>
          <hr />

          {!next ? (
            <UserSignup
              formData={formData}
              setFormData={setFormData}
              setNext={setNext}
              next={next}
              handleShowSnackbar={handleShowSnackbar}
            />
          ) : (
            <UserSignupDetails
              formData={formData}
              setFormData={setFormData}
              setNext={setNext}
              next={next}
              handleShowSnackbar={handleShowSnackbar}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Signup;
