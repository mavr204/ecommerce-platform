import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import OrderService from "../Data/OrderService";
import GreenCheck from "../Icons/GreenCheck";

const AdminOrderItem = ({ order, removeOrderhandler }) => {
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);

  const removeOrder = async (orderId) => {
    try {
      setLoading(true);
      await OrderService.removeOrder(orderId);
      removeOrderhandler(orderId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error deleting order:", error);
    }
  };

  const setStatus = async (orderId, orderStatus) => {
    try {
      await OrderService.setOrderStatus(orderId, orderStatus);
    } catch (error) {
      console.error("Error setting order status:", error);
    }
  };

  const onChangeStatus = async (e) => {
    const { value } = e.target;
    setOrderStatus(value);
    setLoading(true);
    await setStatus(order.orderId, value);
    setTimeout(() => setLoading(false), 200);
  };

  return (
    <tr>
      <td>{order.orderId}</td>
      <td>{order.pid}</td>
      <td>{order.uid}</td>
      <td>{order.address}</td>
      <td>{order.orderDate}</td>
      <td>{order.deliveryDate}</td>
      <td>
        <form>
          <select
            name="status"
            id="status"
            value={orderStatus}
            onChange={onChangeStatus}
            disabled={loading}
          >
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Deliverd</option>
          </select>
        </form>
      </td>
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
  );
};

export default AdminOrderItem;
