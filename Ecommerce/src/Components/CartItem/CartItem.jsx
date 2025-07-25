import React, { useEffect, useState } from "react";
import "./CartItem.css";
import CartService from "../Data/CartService";
import { useNavigate } from "react-router-dom";
import WishlistService from "../Data/WishlistService";

const CartItem = (props) => {
  const [itemQty, setitemQty] = useState(Number(props.qty));
  const navigate = useNavigate();

  const handleChange = (amount) => {
    setitemQty(amount);
    if (amount === 0) {
      props.removeFromCartHandler(props.id);
    }
    const totalPrice =
      amount < itemQty ? props.discountedPrice * -1 : props.discountedPrice;
    props.updateTotal(totalPrice);
  };
  const updateQty = async () => {
    try {
      await CartService.updateQty(itemQty, props.id);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  useEffect(() => {
    updateQty();
  }, [itemQty]);

  const removeFromcart = (e) => {
    e.stopPropagation();
    props.removeFromCartHandler(props.id);
  };
  const openProduct = () => {
    navigate("/products/" + props.id);
  };
  const moveToWishlist = async (e) => {
    e.stopPropagation();
    try {
      const data = { pid: props.id };
      await WishlistService.additem(data);
      props.removeFromCartHandler(props.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cart-item-container" onClick={openProduct}>
      <div className="cart-item">
        <div className="item-icon">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="item-details">
          <h3>{props.title}</h3>
          <p>
            <b>
              ₹ {props.discountedPrice} {itemQty !== 1 && "x " + itemQty}
            </b>
          </p>
          <p>
            <i>
              M.R.P.: ₹<s>{props.price}</s>
            </i>
          </p>
          <div className="product-control">
            <a onClick={removeFromcart}>Remove From Cart</a>
            <a onClick={moveToWishlist}>Move to Wishlist</a>
          </div>
          <div className="qty-control-cart">
            <span
              className="qty-ctrl-btn-cart"
              onClick={(e) => {
                e.stopPropagation();
                handleChange(itemQty - 1);
              }}
            >
              –
            </span>
            <span className="amount-item-cart">{itemQty}</span>
            <span
              className="qty-ctrl-btn-cart"
              onClick={(e) => {
                e.stopPropagation();
                handleChange(itemQty + 1);
              }}
            >
              +
            </span>
          </div>
        </div>
      </div>
      <div className="line"></div>
    </div>
  );
};

export default CartItem;
