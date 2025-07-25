import React, { useState, useEffect } from "react";
import "./popular.css";
import ProductService from "../Data/ProductService";
import ImageService from "../Data/ImageService";
import Item from "../Item/Item";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Popular = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getPopularProducts();
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
    fetchProducts();
  }, []);

  return (
    <div className="popular">
      <h2>Trending Gaming PCs</h2>
      <div className="line"></div>
      <div className="item-wrapper">
        <div className="popular-item">
          {products.map((item, k) => (
            <div className="m-auto" key={k}>
              {!loading ? (
                <div key={k}>
                  <Item
                    key={k}
                    id={item.id}
                    name={item.title}
                    image={item.image}
                    discountedPrice={"₹" + item.discountedPrice}
                    price={"₹" + item.price}
                  />
                </div>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90%",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular;
