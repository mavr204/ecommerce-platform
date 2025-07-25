import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderService from "../Data/OrderService";
import ProductService from "../Data/ProductService";
import GreenCheck from "../Icons/GreenCheck";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ImageService from "../Data/ImageService";
import PaymentService from "../Data/PaymentService";

const CreateCartOrder = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isDragging = useRef(false);

  

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  const renderStatusMessage = (status) => {
    if (status === "delivered") {
      return "Item has been Delivered";
    } else if (status === "shipped") {
      return "Item in Transit";
    } else if (status === "pending") {
      return "Order placed";
    } else {
      return "Unknown status";
    }
  };

  const openProduct = () => {
    if (!isDragging.current) {
      navigate("/products/" + orderDetails.pid);
    }
  };

  const handleGoHome = (e) => {
    e.stopPropagation();
    navigate("/");
  };

  const handleMouseDown = () => {
    isDragging.current = false;
  };

  const handleMouseMove = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  return (
    <div className="container-edit-back" style={{ minHeight: "80vh" }}>
      <div className="container-user-edit">
        <div className="profile-header">
          <h3 className="text" style={{ fontSize: "35px" }}>
            {productDetails.title}
          </h3>
        </div>
        <hr />
        <div className="user-details-view">
          <div
            className="cart-item-container"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div className="cart-item" onClick={openProduct}>
              <div className="item-icon">
                <img src={productDetails.image} alt={productDetails.title} />
              </div>

              <div className="item-details">
                <div className="order-details-data">
                  {orderDetails.orderStatus && (
                    <>
                      <GreenCheck style={{ fontSize: 25 }} />
                      <p style={{ fontSize: 25 }}>
                        {renderStatusMessage(orderDetails.orderStatus)}
                      </p>
                    </>
                  )}
                </div>
                <div className="order-details-data">
                  <p className="order-details-content">
                    #ID: {orderDetails.orderId}
                  </p>
                </div>
                <div className="order-details-data">
                  <p className="order-details-content">
                    Delivery Address: {orderDetails.address}
                  </p>
                </div>
                <p>
                  <b>₹ {productDetails.discountedPrice}</b>
                </p>
                <p>
                  <b>OrderPlaced on: {orderDetails.orderDate}</b>
                </p>
                <p>
                  <b>Delivery Date: {orderDetails.deliveryDate}</b>
                </p>
              </div>
            </div>
            <hr />
            <div className="order-details-btn-column">
              <button
                className="wishlist-page-ctrl"
                onClick={handleGoHome}
                style={{ width: "80%" }}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCartOrder;
