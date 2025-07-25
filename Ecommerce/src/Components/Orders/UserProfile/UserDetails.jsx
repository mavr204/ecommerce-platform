import React, { useEffect, useRef, useState } from "react";
import UserService from "../../Data/UserService";
import UserEditForm from "./UserEditForm";
import UserDataView from "./UserDataView";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const UserDetails = () => {
  const [isEdit, setEdit] = useState(false);
  const [userData, setUserData] = useState({
    houseNumber: "",
    landmark: "",
    street: "",
    city: "",
    pin: "",
    state: "",
    phone: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const getUser = async () => {
    try {
      const response = await UserService.getUser();
      mapData(response.data.address, response.data.name);
      setUserData((prevData) => ({
        ...prevData,
        phone: response.data.pNum,
        email: response.data.email,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  const mapData = (address, name) => {
    const addressComponents = address.split(",").map((part) => part.trim());
    const nameComponents = name.split(" ").map((part) => part.trim());
    setUserData((prevData) => ({
      ...prevData,
      firstName: nameComponents[0],
      lastName: nameComponents[1],
      houseNumber: addressComponents[0],
      landmark: addressComponents[1],
      street: addressComponents[2],
      city: addressComponents[3].split(" ")[0],
      pin: addressComponents[3].split(" ")[1].replace(/[()]/g, ""),
      state: addressComponents[4],
    }));
  };
  useEffect(() => {
    getUser();
    setTimeout(() => setLoading(false), 300);
  }, [isEdit]);
  return (
    <>
      <div className="container-edit-back">
        <div className="container-user-edit">
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <div className="profile-header">
                <div className="edit-user-btn">
                  <button
                    className={isEdit ? "invisible" : ""}
                    onClick={() => {
                      setEdit(!isEdit);
                    }}
                  >
                    <EditIcon />
                  </button>
                </div>
                <h2 className="text">
                  {userData.firstName} {userData.lastName}
                </h2>
              </div>
              <hr />

              {!isEdit ? (
                <UserDataView userData={userData} setEdit={setEdit} />
              ) : (
                <UserEditForm userData={userData} setEdit={setEdit} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
