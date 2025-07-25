import React, { useContext, useState } from "react";
import "../Orders/UserProfile/UserEditForm.css";
import UserService from "../Data/UserService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import CircularProgress from "@mui/material/CircularProgress";

const UserSignupDetails = (props) => {
  const [formError, setFformError] = useState({});
  const navigate = useNavigate();
  const { handleShowSnackbar, setLoggedIn } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(props.formData);
    setFformError(error);
    if (Object.keys(error).length === 0) {
      if (await checkPhone()) {
        handleShowSnackbar(
          "This Phone Number is Already Registered with Us",
          "error"
        );
      } else {
        setLoading(true);
        await UserService.addUser(props.formData);
        await login();
        setLoggedIn(true);

        handleShowSnackbar(
          "Account Created, Welcome " + props.formData.firstName + " !",
          "success"
        );
        navigate("/");
      }
    } else {
      handleShowSnackbar("Please Fill All The Required Fields", "error");
    }
  };
  const login = async () => {
    try {
      const response = await UserService.authUser(
        props.formData.email,
        props.formData.password
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    const regexNumber = /^\d*$/;
    const alphaRegex = /^[A-Za-z.-]*$/;
    const { name, value } = e.target;
    if (
      name !== "phone" &&
      name !== "pin" &&
      name !== "lastName" &&
      name !== "firstName" &&
      name !== "city" &&
      name !== "state"
    ) {
      props.setFormData({ ...props.formData, [name]: value });
    } else if (
      (name === "phone" || name === "pin") &&
      regexNumber.test(value)
    ) {
      props.setFormData({ ...props.formData, [name]: value });
    } else if (
      (name === "firstName" ||
        name === "lastName" ||
        name === "city" ||
        name === "state") &&
      alphaRegex.test(value)
    ) {
      props.setFormData({ ...props.formData, [name]: value });
    }
  };
  const validateForm = (values) => {
    const errors = {};
    const passwordFormat =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={};':",./<>?|\\[\]~-])[A-Za-z\d!@#$%^&*()_+={};':",./<>?|\\[\]~-]{8,}$/;
    if (!values.firstName) {
      errors.firstName = "red";
    }

    if (!values.lastName) {
      errors.lastName = "red";
    }

    if (!values.phone) {
      errors.phone = "red";
    }

    if (!values.street) {
      errors.street = "red";
    }

    if (!values.pin) {
      errors.pin = "red";
    }

    if (!values.landmark) {
      errors.landmark = "red";
    }

    if (!values.city) {
      errors.city = "red";
    }

    if (!values.state) {
      errors.state = "red";
    }

    if (!values.houseNumber) {
      errors.houseNumber = "red";
    }
    return errors;
  };
  const checkPhone = async () => {
    try {
      const response = await UserService.phoneExists(props.formData.phone);
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
              type="tel"
              name="phone"
              id="phone"
              value={props.formData.phone || ""}
              onChange={handleChange}
              required
              autoComplete="true"
            />
            <div
              className="underline"
              style={{
                backgroundColor: formError.phone,
              }}
            ></div>
            <label
              htmlFor="phone"
              style={{
                color: formError.phone,
                transform: "phone" in formError ? "translateY(-20px)" : "",
              }}
            >
              Phone
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={props.formData.firstName || ""}
              onChange={handleChange}
              required
            />
            <div
              className="underline"
              style={{
                backgroundColor: formError.firstName,
              }}
            ></div>
            <label
              htmlFor="firstName"
              style={{
                color: formError.firstName,
                transform: "firstName" in formError ? "translateY(-20px)" : "",
              }}
            >
              First Name
            </label>
          </div>

          <div className="input-data">
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={props.formData.lastName || ""}
              onChange={handleChange}
              required
            />
            <div
              className="underline"
              style={{
                backgroundColor: formError.lastName,
              }}
            ></div>
            <label
              htmlFor="lastName"
              style={{
                color: formError.lastName,
                transform: "lastName" in formError ? "translateY(-20px)" : "",
              }}
            >
              Last Name
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="houseNumber"
              id="houseNumber"
              value={props.formData.houseNumber || ""}
              onChange={handleChange}
              required
            />
            <div
              className="underline"
              style={{
                backgroundColor: formError.houseNumber,
              }}
            ></div>
            <label
              htmlFor="houseNumber"
              style={{
                color: formError.houseNumber,
                transform:
                  "houseNumber" in formError ? "translateY(-20px)" : "",
              }}
            >
              House no./Flat no.
            </label>
          </div>

          <div className="input-data">
            <input
              type="text"
              name="landmark"
              id="landmark"
              value={props.formData.landmark || ""}
              onChange={handleChange}
              required
            />
            <div
              className="underline"
              style={{
                backgroundColor: formError.landmark,
              }}
            ></div>
            <label
              htmlFor="landmark"
              style={{
                color: formError.landmark,
                transform: "landmark" in formError ? "translateY(-20px)" : "",
              }}
            >
              Landmark
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="street"
              id="street"
              value={props.formData.street || ""}
              onChange={handleChange}
              required
            />
            <div
              className="underline"
              style={{
                backgroundColor: formError.street,
              }}
            ></div>
            <label
              htmlFor="street"
              style={{
                color: formError.street,
                transform: "street" in formError ? "translateY(-20px)" : "",
              }}
            >
              Street
            </label>
          </div>

          <div className="input-data">
            <input
              type="text"
              name="city"
              id="city"
              value={props.formData.city || ""}
              onChange={handleChange}
              required
            />
            <div
              className="underline"
              style={{
                backgroundColor: formError.city,
              }}
            ></div>
            <label
              htmlFor="city"
              style={{
                color: formError.city,
                transform: "city" in formError ? "translateY(-20px)" : "",
              }}
            >
              City
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="pin"
              id="pin"
              value={props.formData.pin || ""}
              onChange={handleChange}
              required
            />
            <div
              className="underline"
              style={{
                backgroundColor: formError.pin,
              }}
            ></div>
            <label
              htmlFor="pin"
              style={{
                color: formError.pin,
                transform: "pin" in formError ? "translateY(-20px)" : "",
              }}
            >
              Pin
            </label>
          </div>

          <div className="input-data">
            <input
              type="text"
              name="state"
              id="state"
              value={props.formData.state || ""}
              onChange={handleChange}
              required
            />
            <div
              className="underline"
              style={{
                backgroundColor: formError.state,
              }}
            ></div>
            <label
              htmlFor="state"
              style={{
                color: formError.state,
                transform: "state" in formError ? "translateY(-20px)" : "",
              }}
            >
              State
            </label>
          </div>
        </div>

        <div className="form-row submit-btn">
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <div className="input-data">
                <div className="inner"></div>
                <input type="button" onClick={handleSubmit} value="Submit" />
              </div>
              <div className="input-data">
                <div className="inner"></div>
                <input
                  type="button"
                  onClick={() => {
                    props.setNext(!props.next);
                  }}
                  value="Cancel"
                />
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default UserSignupDetails;
