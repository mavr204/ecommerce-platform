import React, { useState, useEffect, useContext } from "react";
import "./CSS/ProductDetailsPage.css";
import { useParams, useNavigate } from "react-router-dom";
import ProductSpecsService from "../Components/Data/ProductSpecsService";
import ProductService from "../Components/Data/ProductService";
import ImageService from "../Components/Data/ImageService";
import { UserContext } from "../Context/UserContext";
import CartService from "../Components/Data/CartService";
import { CartContext } from "../Context/CartContext";
import WishlistIcon from "../Components/Wishlist/WishlistIcon";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const productIdNumber = parseInt(productId);
  const [specs, setSpecs] = useState({});
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const { fetchCartCount } = useContext(CartContext);

  const getProductSpec = async () => {
    try {
      const response = await ProductSpecsService.getProductSpec(
        productIdNumber
      );
      setSpecs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProduct = async () => {
    try {
      // Fetch product details
      const response = await ProductService.getProductById(productIdNumber);

      // Fetch product image
      const imageResponse = await ImageService.getImage(response.data.id);
      const imageUrl = URL.createObjectURL(
        new Blob([imageResponse.data], { type: "image/jpeg" })
      );

      // Set product details with image
      setProduct({ ...response.data, image: imageUrl });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProductSpec();
      await getProduct();
      setTimeout(() => setLoading(false), 500);
    };

    fetchData();
  }, []);

  const addToCart = async () => {
    if (isLoggedIn) {
      let response;
      try {
        response = await CartService.isItemInCart(productIdNumber);
      } catch (error) {
        console.error(error);
      }
      if (!response.data) {
        const data = { pid: Number(productIdNumber) };
        try {
          await CartService.additem(data);
          fetchCartCount();
        } catch (error) {
          console.error(error);
        }
      } else {
        // add a message later
        console.log("Item already in cart");
      }
    } else {
      navigate("/login");
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
    <div className="product-details">
      <div className="img-container">
        <img src={product?.image} alt={product?.title} />
      </div>
      <div className="specs">
        <h2>{product?.title}</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <u>Specs</u>
              </th>
              <td>Details</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(specs).map((key) => (
              <tr key={key}>
                <th>{key}</th>
                <td>{specs[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="product-page-bot">
          <div className="pd-pg-price">
            <p>
              Price: <del>{product?.price}</del>
              <span>&nbsp;{product?.discountedPrice}</span>
            </p>
            <div className="wishlist-btn-pd">
              <WishlistIcon pid={productIdNumber} />
            </div>
          </div>
          <div className="productpage-buttons-container">
            <button className="buy-now-button">Buy Now</button>
            <button className="add-to-cart-button" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
