import React, { useState, useEffect, useContext } from "react";
import CartItem from "../CartItem/CartItem";
import ProductService from "../Data/ProductService";
import "./CartBody.css";
import CartService from "../Data/CartService";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ImageService from "../Data/ImageService";

const CartBody = () => {
  const navigate = useNavigate();
  const { checkUser } = useContext(UserContext);
  const cartContext = useContext(CartContext); // Access CartContext using useContext

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartEmpty, setCartEmpty] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCartItems = async () => {
    try {
      const response = await CartService.getItems();
      const cartItemsData = response.data;
      fetchProducts(cartItemsData);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userExists = await checkUser();

      if (!userExists) {
        navigate("/login");
      } else {
        await getCartItems();
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);

  const fetchProducts = async (cartItemsData) => {
    try {
      const productFetchPromises = cartItemsData.map(async (item) => {
        const productResponse = await ProductService.getProductById(item.pid);
        return { ...productResponse.data, qty: item.qty };
      });

      const productResponses = await Promise.all(productFetchPromises);
      const responseWithImages = await Promise.all(
        productResponses.map(async (item) => {
          const imageResponse = await ImageService.getImage(item.id);
          const imageUrl = URL.createObjectURL(
            new Blob([imageResponse.data], { type: "image/jpeg" })
          );
          return { ...item, image: imageUrl };
        })
      );
      setProducts(responseWithImages);
      calculateTotal(productResponses);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const calculateTotal = (productsData) => {
    let cartTotal = 0;
    productsData.forEach((item) => {
      cartTotal += Number(item.discountedPrice) * Number(item.qty);
    });
    setTotal(cartTotal);
    setCartEmpty(cartTotal === 0);
  };

  const updateTotal = (newTotal) => {
    setTotal((prevTotal) => prevTotal + Number(newTotal));
  };

  const removeFromCart = async (pid) => {
    try {
      await CartService.deleteItem(pid);

      const updatedProducts = products.filter((item) => item.id !== pid);
      setProducts(updatedProducts);
      calculateTotal(updatedProducts);
      cartContext.fetchCartCount(); // Access fetchCartCount from CartContext
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

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
      <div className="cart-container">
        <div className="header-filler"></div>
        <div className={`cart-container ${cartEmpty ? "d-none" : ""}`}>
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <div className="line"></div>
          </div>
          {products.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              discountedPrice={item.discountedPrice}
              qty={item.qty}
              updateTotal={updateTotal}
              removeFromCartHandler={removeFromCart}
            />
          ))}
          <div className="buy-cart">
            <div className="cart-total">
              <p>Grand Total:</p> <p>₹{total}</p>
            </div>
            <button
              onClick={() => {
                navigate("/cartbuy");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className={`empty-cart ${cartEmpty ? "" : "d-none"}`}>
        <h3>WOW! Such Empty!</h3>
      </div>
    </>
  );
};

export default CartBody;
