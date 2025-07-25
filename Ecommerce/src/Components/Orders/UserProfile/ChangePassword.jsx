import React, { useState } from "react";
import Switch from "@mui/material/Switch";

const ChangePassword = ({
  setOldPassword,
  oldPassword,
  formError,
  formData,
  setFormData,
  setPassword,
  password,
}) => {
  const [isVisible, setVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChangeConfirm = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };
  const handleChangeOld = (e) => {
    const { value } = e.target;
    setOldPassword(value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="password-container">
      <div className="close-pwd-chng text">
        <p>Change Password</p>
        <p
          className="chng-x"
          onClick={() => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              password: "",
            }));

            setOldPassword("");
            setPassword(!password);
          }}
        >
          X
        </p>
      </div>
      <hr />
      <div className="form-row">
        <div className="input-data">
          <input
            type={isVisible ? "text" : "password"}
            name="oldPassword"
            id="oldPassword"
            value={oldPassword || ""}
            onChange={handleChangeOld}
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
            htmlFor="oldPassword"
            style={{
              color: formError.oldPassword,
              transform: "oldPassword" in formError ? "translateY(-20px)" : "",
            }}
          >
            Old Password
          </label>
        </div>
      </div>
      <div className="form-row">
        <div className="input-data">
          <input
            type={isVisible ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password || ""}
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
                  (!confirmPassword || confirmPassword != formData.password)) ||
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
    </div>
  );
};

export default ChangePassword;
