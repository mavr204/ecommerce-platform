import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import UserService from "../Data/UserService";
import GreenCheck from "../Icons/GreenCheck";

const SearchUser = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const removeUser = async (uid) => {
    try {
      setLoading(true);
      await UserService.removeUser(uid);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error deleting user:", error);
    }
  };

  return (
    <table className="table table-bordered ">
      <thead className="thead-light">
        <tr>
          <th scope="col">User Id</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Address</th>
          <th scope="col">Delete</th>
          <th scope="col">Status Icon</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{user.uid}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.pnum}</td>
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
      </tbody>
    </table>
  );
};

export default SearchUser;
