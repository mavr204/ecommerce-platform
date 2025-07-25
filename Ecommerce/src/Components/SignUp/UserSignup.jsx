import React, { useContext, useEffect, useState } from "react";
import UserService from "../Data/UserService";
import Switch from "@mui/material/Switch";
import { UserContext } from "../../Context/UserContext";

const UserSignup = (props) => {
  const [formError, setFformError] = useState({});
  const [isVisible, setVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { handleShowSnackbar } = useContext(UserContext);

  useEffect(() => {
    props.setFormData({ ...props.userData });
  }, [props.userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(props.formData);
    setFformError(error);
    if (Object.keys(error).length === 0) {
      if (await emailExists()) {
        handleShowSnackbar("This Email is Already Registered with Us", "error");
      } else {
        props.setNext(!props.next);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    props.setFormData({ ...props.formData, [name]: value });
  };
  const handleChangeConfirm = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };
  const handleChangeOld = (e) => {
    const { value } = e.target;
    setOldPassword(value);
  };
  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordFormat =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={};':",./<>?|\\[\]~-])[A-Za-z\d!@#$%^&*()_+={};':",./<>?|\\[\]~-]{8,}$/;
    if (!values.email) {
      errors.email = "#FF0000";
    } else if (!regex.test(values.email)) {
      errors.email = "red";
      handleShowSnackbar("Enter a Proper Email", "error");
    }
    // if (!values.password) {
    //   errors.password = "red";
    // } else if (!passwordFormat.test(values.password)) {
    //   errors.password = "red";
    // } else if (confirmPassword && values.password !== confirmPassword) {
    //   handleShowSnackbar(
    //     "The Password And The Confirm Password Must Match",
    //     "error"
    //   );
    //   errors.password = "red";
    // }
    // if (!confirmPassword) {
    //   errors.conPassword = "red";
    // }

    return errors;
  };
  const emailExists = async () => {
    try {
      const response = await UserService.userExists(props.formData.email);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form className="form">
        <div className="form-row">
          <div className="input-data">
            <input
              type="email"
              name="email"
              id="email"
              value={props.formData.email || ""}
              onChange={handleChange}
              required
              autoComplete="true"
            />
            <div
              className="underline"
              style={{
                backgroundColor: formError.email,
              }}
            ></div>
            <label
              htmlFor="email"
              style={{
                color: formError.email,
                transform: "email" in formError ? "translateY(-20px)" : "",
              }}
            >
              Email Address
            </label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input
              type={isVisible ? "text" : "password"}
              name="password"
              id="password"
              value={props.formData.password || ""}
              onChange={handleChange}
              required
            />
            <div
              className="underline"
              style={{
                backgroundColor: formError.password,
              }}
            ></div>
            <label
              htmlFor="password"
              style={{
                color: formError.password,
                transform: "password" in formError ? "translateY(-20px)" : "",
              }}
            >
              New Password
            </label>
          </div>

          <div className="input-data">
            <input
              type={isVisible ? "text" : "password"}
              name="conPass"
              id="conPass"
              value={confirmPassword || ""}
              onChange={handleChangeConfirm}
              required
            />
            <div
              className="underline"
              style={{
                backgroundColor: formError.password,
              }}
            ></div>
            <label
              htmlFor="conPass"
              style={{
                color:
                  ("password" in formError &&
                    (!confirmPassword ||
                      confirmPassword != props.formData.password)) ||
                  "conPassword" in formError
                    ? "red"
                    : "",
                transform:
                  ("password" in formError && !confirmPassword) ||
                  "conPassword" in formError
                    ? "translateY(-20px)"
                    : "",
              }}
            >
              Confirm New Password
            </label>
          </div>
        </div>
        <div className="visble-toggle">
          <Switch
            checked={isVisible}
            onChange={() => {
              setVisible(!isVisible);
            }}
            inputProps={{ "aria-label": "toggle switch" }}
          />{" "}
          Show Password
        </div>
        <div className="form-row submit-btn">
          <div className="input-data">
            <div className="inner"></div>
            <input type="button" onClick={handleSubmit} value="Submit" />
          </div>
        </div>
      </form>
    </>
  );
};

export default UserSignup;
