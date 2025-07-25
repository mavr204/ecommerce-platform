import React, { useEffect, useState } from "react";
import OrderHistory from "./OrderHistory";
import OrderService from "../Data/OrderService";
import ProductService from "../Data/ProductService";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ImageService from "../Data/ImageService";

const PaginationOrders = () => {
  const [products, setProducts] = useState([]);
  const ITEMS_PER_PAGE = 4;
  const [page, setPage] = useState(0);
  const [pageEnd, setPageEnd] = useState(ITEMS_PER_PAGE);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isOrder, setOrder] = useState(false);

  const getOrders = async () => {
    try {
      const response = await OrderService.getOrders();
      const orderData = response.data;
      return fetchProducts(orderData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const fetchProducts = async (orderData) => {
    try {
      // Create an object mapping pid to product details
      const productDetailsMap = {};
      const productFetchPromises = orderData.map(async (item) => {
        if (!productDetailsMap[item.pid]) {
          const productResponse = await ProductService.getProductById(item.pid);
          productDetailsMap[item.pid] = productResponse.data;
        }
      });

      await Promise.all(productFetchPromises);

      // Merge orderData with corresponding product responses based on the pid
      const mergedProducts = orderData.map((order) => ({
        ...order,
        ...productDetailsMap[order.pid],
      }));
      const responseWithImages = await Promise.all(
        mergedProducts.map(async (item) => {
          const imageResponse = await ImageService.getImage(item.id);
          const imageUrl = URL.createObjectURL(
            new Blob([imageResponse.data], { type: "image/jpeg" })
          );
          return { ...item, image: imageUrl };
        })
      );
      setProducts(responseWithImages);
      return mergedProducts;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleClick = (type) => {
    if (type === "prev") {
      setPageEnd(page);
      setPage(() => {
        if (page - ITEMS_PER_PAGE < 0) {
          return 0;
        } else return page - ITEMS_PER_PAGE;
      });
    } else if (type === "next") {
      setPage(page + ITEMS_PER_PAGE);
      setPageEnd(() => {
        if (pageEnd + ITEMS_PER_PAGE > products.length) {
          return products.length;
        } else return pageEnd + ITEMS_PER_PAGE;
      });
    }
  };

  const ordersExist = async () => {
    try {
      return (await OrderService.orderExists()).data;
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (await ordersExist()) {
        const response = await getOrders();
        setTotalPages(Math.ceil(response.length / ITEMS_PER_PAGE));
        setOrder(true);
      }
      setTimeout(() => setLoading(false), 300);
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
          height: "20vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      {!isOrder ? (
        ""
      ) : (
        <div className="mb-2">
          <OrderHistory orders={products.slice(page, pageEnd)} />

          <div
            className="pt-3 pb-3 d-flex justify-content-center gap-3 pr-0"
            style={{ backgroundColor: "#f7f7f7", paddingInline: "0" }}
          >
            <button
              onClick={() => {
                handleClick("prev");
                setCurrentPage(currentPage - 1);
              }}
              disabled={page === 0}
              className="p-1 pagination-button"
            >
              Previous
            </button>
            <span className="page-number">
              {" "}
              Page {currentPage} of {totalPages}{" "}
            </span>
            <button
              onClick={() => {
                handleClick("next");
                setCurrentPage(currentPage + 1);
              }}
              disabled={pageEnd >= products.length}
              className="p-1 pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaginationOrders;
