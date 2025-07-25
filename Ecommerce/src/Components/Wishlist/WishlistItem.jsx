import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import CartService from "../Data/CartService";
import { CartContext } from "../../Context/CartContext";

const WishlistItem = (props) => {
  const { fetchCartCount } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const openProduct = () => {
    navigate("/products/" + props.pid);
  };
  const addToCart = async (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      let response;
      try {
        response = await CartService.isItemInCart(props.pid);
      } catch (error) {
        console.error(error);
      }
      if (!response.data) {
        const data = { pid: Number(props.pid) };
        try {
          await CartService.additem(data);
          fetchCartCount();
        } catch (error) {
          console.error(error);
        }
      } else {
        // add a message later
        console.log("Item already in Wishlist");
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="cart-item-container" onClick={openProduct}>
      <div className="cart-item">
        <div className="item-icon">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="item-details">
          <h3 onClick={openProduct}>{props.title}</h3>
          <p>
            <b>₹ {props.discountedPrice}</b>
          </p>
          <p>
            <i>
              M.R.P.: ₹<s>{props.price}</s>
            </i>
          </p>
          <div className="product-control">
            <a onClick={addToCart}>Add To Cart</a>
            <a
              onClick={(e) => {
                e.stopPropagation();
                props.removeListHandler(props.pid);
              }}
            >
              Remove From Wishlist
            </a>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default WishlistItem;
