import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Unused/navbar.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Cart from "./Pages/Cart.jsx";
import "./App.css";
import Footer from "./Components/Footer/Footer.jsx";
import Signup from "./Pages/Signup.jsx";
import ProductDetailsPage from "./Pages/ProductDetailsPage.jsx";
import AddProduct from "./Pages/AddProduct.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import OrdersPage from "./Pages/OrdersPage.jsx";
import Snackbar from "./Components/Snackbar/Snackbar.jsx";
import OrderDetails from "./Pages/OrderDetails.jsx";
import AdminHome from "./Pages/AdminHome.jsx";
import NotFound from "./Pages/NotFound.jsx";
import { UserContext } from "./Context/UserContext.jsx";
import Box from "@mui/material/Box";
import AdminOrder from "./Pages/AdminOrder.jsx";
import AdminUser from "./Pages/AdminUser.jsx";
import OffcanvasNavbar from "./Components/navbar/OffcanvasNavbar.jsx";
import AdminNavbar from "./Components/navbar/AdminNavbar.jsx";
import Redirect from "./Components/Utility/Redirect.jsx";
import Spinner from "./Components/Icons/Spinner.jsx";
import Products from "./Pages/Products.jsx";
import PaymentPage from "./Pages/PaymentPage.jsx";
import CreateCartOrder from "./Components/CreateOrder/CreateCartOrder.jsx";
import CartPaymentPage from "./Pages/CartPaymentPage.jsx";

function App() {
  const { checkUser, isAdmin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const fetchUserStatus = async () => {
      setLoading(true);
      const userExists = await checkUser();
      setAuthenticated(userExists);
      if (userExists) {
        const adminStatus = await isAdmin();
        setAdmin(adminStatus);
      }
      setTimeout(() => setLoading(false), 200);
    };
    fetchUserStatus();
  }, [checkUser, isAdmin]);

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
        <Spinner />
      </Box>
    );
  }

  return (
    <>
      <BrowserRouter>
        {admin ? <AdminNavbar /> : <OffcanvasNavbar />}
        <Routes>
          {authenticated ? (
            admin ? (
              <>
                <Route path="/" element={<AdminHome />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/getorders" element={<AdminOrder />} />
                <Route path="/getusers" element={<AdminUser />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/order/:orderId" element={<OrderDetails />} />
                <Route
                  path="/products/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/catalogue" element={<Products />} />
              </>
            )
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Redirect link={"/login"} />} />
              <Route path="/wishlist" element={<Redirect link={"/login"} />} />
              <Route path="/orders" element={<Redirect link={"/login"} />} />
              <Route
                path="/products/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/catalogue" element={<Products />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
          <Route path="/pre-built" element={<OffcanvasNavbar />} />
          <Route path="/pay/:pid" element={<PaymentPage />} />
          <Route path="/pay" element={<PaymentPage />} />
          <Route path="/cartbuy" element={<CartPaymentPage />} />
        </Routes>
        <Snackbar />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
