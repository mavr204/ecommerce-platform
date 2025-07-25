import React, { useContext, useEffect, useState } from "react";
import UserDetails from "../Components/Orders/UserProfile/UserDetails";
import PaginationOrders from "../Components/Orders/PaginationOrders";
import "./CSS/Orders.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const OrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const { checkUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const userExists = await checkUser();

      if (!userExists) {
        navigate("/login");
      } else {
        setTimeout(() => setLoading(false), 200);
      }
    };

    fetchData();
  }, []);
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

  return (
    <>
      <UserDetails />
      <PaginationOrders />
    </>
  );
};

export default OrdersPage;
