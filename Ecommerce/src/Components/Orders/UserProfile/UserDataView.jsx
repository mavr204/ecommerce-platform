import React from "react";

const UserDataView = (props) => {
  return (
    <div className="user-details-view">
      <p>Phone no.- {props.userData.phone}</p>
      <p>Email- {props.userData.email}</p>
      <p>
        Address-{" "}
        {props.userData.houseNumber + "," + props.userData.landmark + ","}
      </p>
      <p>{props.userData.street + ", " + props.userData.city + ","}</p>
      <p>{props.userData.pin + ", " + props.userData.state + ","}</p>
    </div>
  );
};

export default UserDataView;
