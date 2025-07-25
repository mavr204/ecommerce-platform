import React, { useState, useEffect } from "react";
import "./NewArrivals.css";
import ProductService from "../Data/ProductService";
import ImageService from "../Data/ImageService";
import Item from "../Item/Item";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await ProductService.getLatestProducts();
        const responseWithImages = await Promise.all(
          response.data.map(async (item) => {
            const imageResponse = await ImageService.getImage(item.id);
            const imageUrl = URL.createObjectURL(
              new Blob([imageResponse.data], { type: "image/jpeg" })
            );
            return { ...item, image: imageUrl };
          })
        );
        setProducts(responseWithImages);
        setTimeout(() => setLoading(false), 200);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <div className="new-arrivals">
      <h2>Fresh Arrivals</h2>
      <div className="line"></div>
      <div className="new-item">
        {products.map((item, k) => (
          <div className="item-container" key={k}>
            {!loading ? (
              <Item
                key={k}
                id={item.id}
                name={item.title}
                image={item.image}
                discountedPrice={"₹" + item.discountedPrice}
                price={"₹" + item.price}
              />
            ) : (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
