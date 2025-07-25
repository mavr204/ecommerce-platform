import React, { useContext, useEffect, useState } from "react";
import "./UserEditForm.css";
import UserService from "../../Data/UserService";
import { UserContext } from "../../../Context/UserContext";
import ChangePassword from "./ChangePassword";

const UserEditForm = (props) => {
  const [formData, setFormData] = useState({});
  const [formError, setFformError] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState(false);
  const { handleShowSnackbar } = useContext(UserContext);

  useEffect(() => {
    setFormData({ ...props.userData });
  }, [props.userData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(formData);
    setFformError(error);
    if (Object.keys(error).length === 0) {
      if (JSON.stringify(props.userData) === JSON.stringify(formData)) {
        handleShowSnackbar("Nothing was Changed", "info");
        props.setEdit(false);
      } else if (
        !(props.userData.email === formData.email) &&
        (await emailExists())
      ) {
        handleShowSnackbar("This Email is Already Registered with Us", "error");
      } else if (
        !(props.userData.phone === formData.phone) &&
        (await checkPhone())
      ) {
        handleShowSnackbar(
          "This Phone Number is Already Registered with Us",
          "error"
        );
      } else {
        if (formData.password != "") {
          if ((await UserService.authPassword(oldPassword)).data) {
            await UserService.updatePassword(formData.password);
          } else {
            handleShowSnackbar("Wrong Password", "error");
            return;
          }
        }
        await UserService.updateDetails(formData);
        handleShowSnackbar("Details Updated!", "success");
      }
    } else if (error.email != "red") {
      handleShowSnackbar("Please Fill All The Required Fields", "error");
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
      setFormData({ ...formData, [name]: value });
    } else if (
      (name === "phone" || name === "pin") &&
      regexNumber.test(value)
    ) {
      setFormData({ ...formData, [name]: value });
    } else if (
      (name === "firstName" ||
        name === "lastName" ||
        name === "city" ||
        name === "state") &&
      alphaRegex.test(value)
    ) {
      setFormData({ ...formData, [name]: value });
    }
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
  const checkPhone = async () => {
    try {
      const response = await UserService.phoneExists(formData.phone);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const emailExists = async () => {
    try {
      const response = await UserService.userExists(formData.email);
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
              value={formData.email || ""}
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
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone || ""}
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
              value={formData.firstName || ""}
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
              value={formData.lastName || ""}
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
              value={formData.houseNumber || ""}
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
              value={formData.landmark || ""}
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
              value={formData.street || ""}
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
              value={formData.city || ""}
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
              value={formData.pin || ""}
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
              value={formData.state || ""}
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

        {password ? (
          <ChangePassword
            setOldPassword={setOldPassword}
            oldPassword={oldPassword}
            formError={formError}
            formData={formData}
            setFormData={setFormData}
            password={password}
            setPassword={setPassword}
          />
        ) : (
          <div className="form-row submit-btn">
            <div className="input-data" id="changePassword">
              <div className="inner"></div>
              <input
                type="button"
                onClick={() => {
                  setPassword(!password);
                }}
                value="Change Password"
              />
            </div>
          </div>
        )}

        <div className="form-row submit-btn">
          <div className="input-data">
            <div className="inner"></div>
            <input type="button" onClick={handleSubmit} value="Submit" />
          </div>
          <div className="input-data">
            <div className="inner"></div>
            <input
              type="button"
              onClick={() => {
                
                props.setEdit(false);
              }}
              value="Cancel"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default UserEditForm;
