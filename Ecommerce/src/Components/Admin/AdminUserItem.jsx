import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import UserService from "../Data/UserService";
import GreenCheck from "../Icons/GreenCheck";

const AdminUserItem = ({ user, removeUserHandler }) => {
  const [loading, setLoading] = useState(false);

  const removeUser = async (uid) => {
    try {
      setLoading(true);
      await UserService.removeUser(uid);
      removeUserHandler(uid);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error deleting user:", error);
    }
  };

  return (
    <tr>
      <td>{user.uid}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.pNum}</td>
      <td>{user.address}</td>
      <td>
        <button
          disabled={loading}
          onClick={() => {
            removeUser(user.uid);
          }}
          className="btn btn-danger"
          style={{
            width: "fit-content",
            padding: ".2em .4em",
            margin: "7px",
          }}
        >
          <DeleteIcon />
        </button>
      </td>
      <td>
        {loading ? (
          <CircularProgress />
        ) : (
          <GreenCheck style={{ fontSize: 25 }} />
        )}
      </td>
    </tr>
  );
};

export default AdminUserItem;
