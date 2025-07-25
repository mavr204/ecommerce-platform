import "./Item.css";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import CartService from "../Data/CartService";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import WishlistIcon from "../Wishlist/WishlistIcon";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentPage from "../../Pages/PaymentPage";

const Item = (props) => {
  const { fetchCartCount } = useContext(CartContext);
  const { checkUser } = useContext(UserContext);
  const navigate = useNavigate();
  // const { handleShowSnackbar } = useContext(UserContext);
  const [isItemInCart, setItemInCart] = useState(false);
  const [isCartScaled, setCartScaled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CartService.isItemInCart(props.id);
        setItemInCart(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [props.id]);

  const addToCart = async () => {
    if (await checkUser()) {
      if (!isItemInCart) {
        const data = { pid: Number(props.id) };
        try {
          await CartService.additem(data);
          await fetchCartCount();
          setItemInCart(true);
        } catch (error) {
          console.error(error);
        }
      } else {
        removeFromCart();
      }
    } else {
      navigate("/login");
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setCartScaled(true);
    addToCart();
    setTimeout(() => {
      setCartScaled(false);
    }, 200);
  };

  const removeFromCart = async () => {
    try {
      await CartService.deleteItem(props.id);
      fetchCartCount();
      setItemInCart(false);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleProductOpen = () => {
    navigate("/products/" + props.id);
  };
  const onBuy = async () => {
    if (await checkUser()) {
      navigate(`/pay/${props.id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="item" onClick={handleProductOpen}>
        <div>
          <div className="item-image">
            <img src={props.image} alt={props.name} />
          </div>
          <div className="item-title">
            <p>{props.name}</p>
          </div>
          <div className="item-heart-icon">
            <WishlistIcon pid={props.id} />
          </div>
          <div className="item-prices">
            <div className="item-price-discount">{props.discountedPrice}</div>
            <div className="item-price">{props.price}</div>
          </div>
        </div>
        <div className="item-buttons">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBuy();
            }}
          >
            Buy Now
          </button>
          <div className="item-add-to-cart" onClick={handleAddToCart}>
            <ShoppingCartIcon
              sx={{
                fontSize: "2rem",
                color: isItemInCart ? "#10439F" : "#56d8e4",
                transform: isCartScaled ? "scale(1.2)" : "scale(1.0)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
