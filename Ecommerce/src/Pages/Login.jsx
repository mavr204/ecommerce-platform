import React, { useRef, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Login.css";
import UserService from "../Components/Data/UserService";
import { UserContext } from "../Context/UserContext";
import Tooltip from "@mui/material/Tooltip";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Login = () => {
  const navigate = useNavigate();
  const { checkUser, setLoggedIn } = useContext(UserContext);
  const signInRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userExists = await checkUser();

      if (userExists) {
        setTimeout(() => navigate("404"), 500);
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

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const getUser = async (email, password) => {
    try {
      const response = await UserService.authUser(email, password);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        try {
          setLoading(true); // Set loading to true before fetching user
          const newUser = await getUser(user.email, user.password);
          if (!newUser) {
            const error = {};
            error.userNotFount = "Wrong email or password";
            setFormErrors(error);
            setLoading(false); // Set loading to false if user not found
          } else {
            setLoggedIn(true);
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setLoading(false); // Set loading to false in case of error
        }
      }
    };

    fetchData();
  }, [formErrors]);

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
    <div className="login-page" ref={signInRef}>
      <div className="login-card">
        <form className="login-input-container" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p className="login-error">{formErrors.userNotFount}</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            value={user.email}
            autoComplete="true"
          />

          <p className="login-error">{formErrors.email}</p>
          <Tooltip
            title="Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one digit, and one special symbol"
            arrow
          >
            <div className="signup-password">
              <input
                className="sign-password-field"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
              />
              <span onClick={handleTogglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
          </Tooltip>

          <p className="login-error">{formErrors.password}</p>
          <button
            className="p-1 pagination-button login-page-btn"
            type="submit"
          >
            Login
          </button>
        </form>

        <Link to="/signup">Not yet registered? Register Now</Link>
      </div>
    </div>
  );
};

export default Login;
