import React, { useContext, useEffect, useState } from "react";
import UserService from "../Components/Data/UserService";
import WishlistItem from "../Components/Wishlist/WishlistItem";
import "./CSS/wishlist.css";
import WishlistService from "../Components/Data/WishlistService";
import ProductService from "../Components/Data/ProductService";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ImageService from "../Components/Data/ImageService";

const Wishlist = () => {
  const [username, setUsername] = useState("");
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 5;
  const [pageEnd, setPageEnd] = useState(ITEMS_PER_PAGE);
  const [products, setProducts] = useState([]);
  const [WishlistEmpty, setWishlistEmpty] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Add loading state
  const { checkUser } = useContext(UserContext);
  const navigate = useNavigate();

  const getUserName = async () => {
    try {
      const response = await UserService.getUser();
      setUsername(getFirstName(response.data.name));
    } catch (error) {
      console.error(error);
    }
  };

  function getFirstName(fullName) {
    const nameArray = fullName.split(" ");
    return nameArray[0];
  }

  const getItems = async () => {
    try {
      const response = await WishlistService.getItems();
      return fetchProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async (wishlistItemsData) => {
    try {
      const productFetchPromises = wishlistItemsData.map(async (item) => {
        const productResponse = await ProductService.getProductById(item.pid);
        return { ...productResponse.data };
      });

      const productResponses = await Promise.all(productFetchPromises);
      const productWithImages = await Promise.all(
        productResponses.map(async (item) => {
          const imageResponse = await ImageService.getImage(item.id);
          const imageUrl = URL.createObjectURL(
            new Blob([imageResponse.data], { type: "image/jpeg" })
          );
          return { ...item, image: imageUrl };
        })
      );
      setProducts(productWithImages);
      setWishlistEmpty(productResponses.length === 0);
      return productResponses;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const pageControl = (pageFlow) => {
    if (pageFlow > 0) {
      setPage(pageEnd);
      setPageEnd(() => {
        if (pageEnd + ITEMS_PER_PAGE > products.length) {
          return products.length;
        } else return pageEnd + ITEMS_PER_PAGE;
      });
    } else {
      setPageEnd(page);
      setPage(() => {
        if (page - ITEMS_PER_PAGE < 0) {
          return 0;
        } else return page - ITEMS_PER_PAGE;
      });
    }
  };

  const removeItem = async (pid) => {
    const data = { pid: pid };
    console.log(pid);
    try {
      await WishlistService.removeItem(data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeListHandler = async (pid) => {
    await removeItem(pid);
    const updatedProducts = products.filter((item) => item.id !== pid);
    setProducts(updatedProducts);
    setWishlistEmpty(updatedProducts.length === 0 ? true : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userExists = await checkUser();

      if (!userExists) {
        navigate("/404");
      } else {
        getUserName();
        const response = await getItems();
        setTotalPages(Math.ceil(response.length / ITEMS_PER_PAGE));
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, []);

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
      <div style={{ minHeight: "100vh", background: "#f7f7f7" }}>
        <div className="header-filler"></div>
        <div className={`wishlist-container ${WishlistEmpty ? "d-none" : ""}`}>
          <div>
            <div className="wishlist-header">
              <h2>{username + "'s Wishlist"}</h2>
              <hr />
            </div>
            {products.slice(page, pageEnd).map((item, k) => (
              <WishlistItem
                key={k}
                pid={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                discountedPrice={item.discountedPrice}
                removeListHandler={removeListHandler}
              />
            ))}
          </div>
          {totalPages === 1 ? (
            ""
          ) : (
            <div className="wishlist-btn-container">
              <button
                disabled={currentPage === 1}
                className="wishlist-page-ctrl"
                onClick={() => {
                  pageControl(-1);
                  setCurrentPage(currentPage - 1);
                }}
              >
                Previous
              </button>
              <span>
                {currentPage} of {totalPages}
              </span>
              <button
                disabled={pageEnd >= products.length}
                className="wishlist-page-ctrl"
                onClick={() => {
                  pageControl(1);
                  setCurrentPage(currentPage + 1);
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={`empty-cart ${WishlistEmpty ? "" : "d-none"}`}>
        <h3>WOW! Such Empty!</h3>
      </div>
    </>
  );
};

export default Wishlist;
