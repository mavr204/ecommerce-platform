import React from "react";
import OrderItem from "../OrderItems/OrderItem";

const OrderHistory = ({ orders }) => {
  return (
    <>
      <div className="new-arrivals" style={{ paddingInline: "0" }}>
        <h2>Orders</h2>
        <div className="line"></div>
        <div className="new-item">
          {orders.map((order, index) => (
            <div className="item-container" key={index}>
              <OrderItem
                pid={order.pid}
                title={order.title}
                image={order.image}
                discountedPrice={"₹" + order.discountedPrice}
                deliveryDate={order.deliveryDate}
                orderStatus={order.orderStatus}
                orderId={order.orderId}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
