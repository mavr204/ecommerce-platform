import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CSS/PaymentPage.css";
import AttachMoneyIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import UpiIcon from "../Components/Icons/UPI";
import CreateOrder from "../Components/CreateOrder/CreateOrder";

const PaymentPage = () => {
  const productId = useParams().pid;
  const options = ["POD", "Card", "UPI"];
  const [paymentOption, setPaymentOption] = useState("");

  useEffect(() => {
    console.log(paymentOption);
  }, [paymentOption]);

  if (paymentOption === "") {
    return (
      <div>
        <div className="header-filler"></div>
        <div className="payment-page-options-container">
          <div className="pay-opt-row">
            <div
              className="pay-opt"
              onClick={() => setPaymentOption(options[0])}
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
            <CreateOrder
              pid={productId}
              method={"POD"}
              transactionAc={"none"}
            />
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

export default PaymentPage;
