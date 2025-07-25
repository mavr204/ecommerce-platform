import React, { useState, useEffect, useRef } from "react";
import ProductService from "../Components/Data/ProductService";
import CircularProgress from "../Components/Icons/Spinner";
import Box from "@mui/material/Box";
import Item from "../Components/Item/Item";
import "./CSS/Product.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import ImageService from "../Components/Data/ImageService";
import Spinner from "../Components/Icons/Spinner";
import useIntersectionObserver from "../Hooks/useIntersectionObserver";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [ref, isIntersecting, resetIntersection] = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  const fetchProducts = async (page, filtered) => {
    try {
      const response = await ProductService.getProductByPage(page, filtered);
      if (response.data && response.data.length > 0) {
        const responseWithImages = await Promise.all(
          response.data.map(async (item) => {
            const imageResponse = await ImageService.getImage(item.id);
            const imageUrl = URL.createObjectURL(
              new Blob([imageResponse.data], { type: "image/jpeg" })
            );
            return { ...item, image: imageUrl };
          })
        );
        return responseWithImages;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  useEffect(() => {
    if (isIntersecting) {
      const loadMoreProducts = async () => {
        setLoadMore(true);
        const newProducts = await fetchProducts(pageNum + 1, filter);
        if (newProducts.length > 0) {
          setProducts((prevData) => [...prevData, ...newProducts]);
          setPageNum((prevPageNum) => prevPageNum + 1);
        }
        setLoadMore(false);
        resetIntersection();
      };
      loadMoreProducts();
    }
  }, [isIntersecting, pageNum, filter, resetIntersection]);

  useEffect(() => {
    const loadInitialProducts = async () => {
      const initialProducts = await fetchProducts(0, filter);
      setProducts(initialProducts);
      setLoading(false);
    };
    loadInitialProducts();
  }, [filter]);

  useEffect(() => {
    if (!loading) {
      filter.forEach((item) => {
        const checkbox = document.getElementById(item);
        if (checkbox) {
          checkbox.checked = true;
        }
      });
    }
  }, [loading, filter]);

  const handleFilterChange = async (e) => {
    const { value, checked } = e.target;
    const newFilter = checked
      ? [...filter, value]
      : filter.filter((item) => item !== value);
    setFilter(newFilter);
    setPageNum(0);
    setLoading(true);
    const filteredProducts = await fetchProducts(0, newFilter);
    setProducts(filteredProducts);
    setLoading(false);
  };

  const toggleFilter = (e) => {
    const filterWrapElements = [...e.target.parentNode.children].filter(
      (child) => child.classList.contains("filter-wrap")
    );
    if (filterWrapElements.length > 0) {
      filterWrapElements.forEach((element) => {
        element.classList.toggle("show-filter");
      });
    } else {
      setTimeout(() => toggleFilter(e), 200);
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
    <div className="outer-container">
      <div className="header-filler"></div>
      <div className="products-container">
        <button className="filter-button" onClick={toggleFilter}>
          <FilterListIcon sx={{ fontSize: 45 }} /> Filter
        </button>
        <div className="filter-wrap">
          {[
            "prebuilt",
            "laptop",
            "gpu",
            "motherboard",
            "cpu",
            "ram",
            "cabinate",
            "fans",
            "psu",
            "others",
          ].map((category) => (
            <div className="filter-checkbox" key={category}>
              <input
                type="checkbox"
                onChange={handleFilterChange}
                id={category}
                className="checkbox-input"
                value={category}
              />
              <label htmlFor={category} className="checkbox-label">
                <div className="tick_mark"></div>
              </label>
              <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
            </div>
          ))}
        </div>
        <div className="product-display-grid">
          {products.map((product, k) => (
            <div className="display-item-cover" key={k}>
              <Item
                id={product.id}
                image={product.image}
                name={product.title}
                discountedPrice={product.discountedPrice}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </div>
      {!loadMore ? (
        <div ref={ref} style={{ height: "10vh" }}></div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <Spinner width="40px" />
        </Box>
      )}
    </div>
  );
};

export default Products;
