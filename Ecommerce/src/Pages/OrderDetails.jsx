import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderService from "../Components/Data/OrderService";
import ProductService from "../Components/Data/ProductService";
import GreenCheck from "../Components/Icons/GreenCheck";
import "./CSS/OrderDetails.css";
import { UserContext } from "../Context/UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ImageService from "../Components/Data/ImageService";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { checkUser } = useContext(UserContext);
  const navigate = useNavigate();
  const isDragging = useRef(false);

  const getOrderById = async () => {
    if (await checkUser()) {
      if (await orderExistsById()) {
        try {
          const response = await OrderService.getOrderById(orderId);
          setOrderDetails(response.data);
          getProductById(response.data.pid);
        } catch (error) {
          console.error(error);
        }
      } else {
        navigate("404");
      }
    } else {
      navigate("404");
    }
  };
  const orderExistsById = async () => {
    try {
      return (await OrderService.orderExistsById(orderId)).data;
    } catch (error) {
      console.error();
    }
  };
  const getProductById = async (pid) => {
    try {
      const response = await ProductService.getProductById(pid);
      const image = URL.createObjectURL(
        new Blob([(await ImageService.getImage(response.data.id)).data], {
          type: "image/jpeg",
        })
      );

      setProductDetails({ ...response.data, image: image });
      setTimeout(() => setLoading(false), 200);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getOrderById();
  }, [orderId]);
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
    navigate("/orders");
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
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
                  <i>
                    M.R.P.: ₹<s>{productDetails.price}</s>
                  </i>
                </p>
              </div>
            </div>
            <hr />
            <div className="order-details-btn-column">
              <button
                className="wishlist-page-ctrl"
                style={{ width: "80%" }}
                onClick={handleButtonClick}
              >
                Buy Again
              </button>
              <button
                className="wishlist-page-ctrl"
                onClick={handleGoHome}
                style={{ width: "80%" }}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
