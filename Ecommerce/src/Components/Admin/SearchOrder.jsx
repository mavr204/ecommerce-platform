import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import OrderService from "../Data/OrderService";
import GreenCheck from "../Icons/GreenCheck";

const SearchOrder = ({ order }) => {
  const [loading, setLoading] = useState(false);

  const removeOrder = async (orderId) => {
    try {
      setLoading(true);
      await OrderService.removeOrder(orderId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error deleting order:", error);
    }
  };

  return (
    <table className="table table-bordered ">
      <thead className="thead-light">
        <tr>
          <th scope="col">Order Id</th>
          <th scope="col">Product Id</th>
          <th scope="col">Customer Id</th>
          <th scope="col">Address</th>
          <th scope="col">Booking Date</th>
          <th scope="col">Delivery Date</th>
          <th scope="col">Order Status</th>
          <th scope="col">Delete</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{order.orderId}</td>
          <td>{order.pid}</td>
          <td>{order.uid}</td>
          <td>{order.address}</td>
          <td>{order.orderDate}</td>
          <td>{order.deliveryDate}</td>
          <td>{order.orderStatus}</td>
          <td>
            <button
              disabled={loading}
              onClick={() => {
                removeOrder(order.orderId);
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

export default SearchOrder;
