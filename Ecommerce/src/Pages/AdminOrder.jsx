import React, { useState, useEffect, useContext, useRef } from "react";
import OrderService from "../Components/Data/OrderService";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import AdminOrderItem from "../Components/Admin/AdminOrderItem";
import { UserContext } from "../Context/UserContext";
import SearchBar from "../Components/Searchbar/Searchbar";
import SearchOrder from "../Components/Admin/SearchOrder";

const AdminOrder = () => {
  const ITEMS_PER_PAGE = 8;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, handleShowSnackbar } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [pageEnd, setPageEnd] = useState(ITEMS_PER_PAGE);
  const navigate = useNavigate();
  const adminHomeRef = useRef(null);
  const [searchData, setSearchData] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchResult, setSearchResult] = useState({});

  useEffect(() => {
    if (adminHomeRef.current) {
      adminHomeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page, pageEnd]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (await isAdmin()) {
        try {
          const response = await OrderService.getAllOrders();
          setOrders(response.data);
          setTimeout(() => setLoading(false), 500);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      } else {
        navigate("/404");
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(orders.length / ITEMS_PER_PAGE));
  }, [orders]);

  const onClick = async () => {
    if (!searchActive) {
      setLoading(true);
      if (searchData !== "") {
        setSearchActive(true);
        const response = await OrderService.getOrderById(searchData);
        setSearchResult(response.data);
        if (Object.keys(response.data).length !== 0) {
          setTimeout(() => setLoading(false), 300);
        } else {
          setSearchActive(false);
          handleShowSnackbar("No Order Found!", "info");
        }
      }
    } else {
      setSearchActive(false);
      setSearchData("");
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
        if (pageEnd + ITEMS_PER_PAGE > orders.length) {
          return orders.length;
        } else return pageEnd + ITEMS_PER_PAGE;
      });
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

  const removeOrder = (orderId) => {
    setOrders(orders.filter((item) => item.orderId !== orderId));
  };

  return (
    <div className="container-edit-back" ref={adminHomeRef}>
      <div className="container-user-edit">
        <div className="profile-header">
          <h2 className="text">Orders</h2>
          <hr />
          <SearchBar
            onClick={onClick}
            searchData={searchData}
            setSearchData={setSearchData}
            placeHolder="Search Orders....."
            width="60%"
            searchActive={searchActive}
          />
        </div>
        {searchActive ? (
          <SearchOrder order={searchResult} key={searchResult.orderId} />
        ) : (
          <>
            <table className="table table-bordered ">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Product Id</th>
                  <th scope="col">Customer Id</th>
                  <th scope="col">Address</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Delivery Date</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(page, pageEnd).map((order) => (
                  <AdminOrderItem
                    order={order}
                    removeOrderhandler={removeOrder}
                    key={order.orderId}
                  />
                ))}
              </tbody>
            </table>
            {totalPages > 1 ? (
              <div
                className="pt-3 pb-3 d-flex justify-content-center gap-3 pr-0"
                style={{ backgroundColor: "#ecebeb", paddingInline: "0" }}
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
                <span>
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
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminOrder;
