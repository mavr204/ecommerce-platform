import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CSS/PaymentPage.css";
import AttachMoneyIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import UpiIcon from "../Components/Icons/UPI";
import CreateOrder from "../Components/CreateOrder/CreateOrder";
import CartService from "../Components/Data/CartService";
import ProductService from "../Components/Data/ProductService";

const CartPaymentPage = () => {
  const productId = useParams().pid;
  const options = ["POD", "Card", "UPI"];
  const [paymentOption, setPaymentOption] = useState("");

  const getCartItems = async () => {
    try {
      const response = await CartService.getItems();
      const cartItemsData = response.data;
      const products = await fetchProducts(cartItemsData);

      products.map((item) => {
        console.log(item);
      });
      console.log(products);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  const fetchProducts = async (cartItemsData) => {
    try {
      const productFetchPromises = cartItemsData.map(async (item) => {
        const productResponse = await ProductService.getProductById(item.pid);
        return { ...productResponse.data, qty: item.qty };
      });

      const productResponses = await Promise.all(productFetchPromises);
      return productResponses;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  if (paymentOption === "") {
    return (
      <div>
        <div className="header-filler"></div>
        <div className="payment-page-options-container">
          <div className="pay-opt-row">
            <div
              className="pay-opt"
              onClick={() => {
                setPaymentOption(options[0]);
                getCartItems();
              }}
            >
              <AttachMoneyIcon
                style={{ fontSize: 64, color: "rgba(16, 67, 159, 1)" }}
              />
              <p>Pay On Delivery</p>
            </div>
            <div
              className="pay-opt"
              onClick={() => setPaymentOption(options[1])}
            >
              <CreditCardIcon
                style={{ fontSize: 64, color: "rgba(16, 67, 159, 1)" }}
              />
              <p>Credit/Debit Card</p>
            </div>
            <div
              className="pay-opt"
              onClick={() => setPaymentOption(options[2])}
            >
              <UpiIcon />
              <p>UPI</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="header-filler"></div>
        <div className="payment-page-container">
          {paymentOption === options[0] ? (
            <></>
          ) : paymentOption === options[1] ? (
            <>Card</>
          ) : paymentOption === options[2] ? (
            <>upi</>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
};

export default CartPaymentPage;
