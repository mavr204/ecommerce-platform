import React, { useState, useEffect, useContext, useRef } from "react";
import ProductService from "../Components/Data/ProductService";
import ImageService from "../Components/Data/ImageService";
import Spinner from "../Components/Icons/Spinner";
import Box from "@mui/material/Box";
import AdminProductItem from "../Components/Admin/AdminProductItem";
import { UserContext } from "../Context/UserContext";
import SearchBar from "../Components/Searchbar/Searchbar";
import SearchItem from "../Components/Admin/SearchItem";
import "./CSS/ProductTable.css";

const AdminHome = () => {
  const ITEMS_PER_PAGE = 5;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, handleShowSnackbar } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [pageEnd, setPageEnd] = useState(ITEMS_PER_PAGE);
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
    const fetchProducts = async () => {
      if (await isAdmin()) {
        try {
          const response = await ProductService.getProduct();
          setProducts(response.data);
          const productsWithImages = await Promise.all(
            response.data.map(async (item) => {
              const imageResponse = await ImageService.getImage(item.id);
              const imageUrl = URL.createObjectURL(
                new Blob([imageResponse.data], { type: "image/jpeg" })
              );
              return { ...item, image: imageUrl };
            })
          );

          setProducts(productsWithImages);

          setTimeout(() => setLoading(false), 500);

          // Clean up created object URLs when the component unmounts
          return () => {
            productsWithImages.forEach((product) =>
              URL.revokeObjectURL(product.image)
            );
          };
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(products.length / ITEMS_PER_PAGE));
  }, [products]);

  const onClick = () => {
    if (!searchActive) {
      setLoading(true);
      if (searchData != "") {
        setSearchActive(true);
        if (products.filter((item) => item.id !== searchData).length > 0) {
          setSearchResult(products.filter((item) => item.id !== searchData)[0]);
          setTimeout(() => setLoading(false), 300);
        } else {
          setLoading(false);
          setSearchActive(false);
          handleShowSnackbar("No Product Found!", "info");
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
        if (pageEnd + ITEMS_PER_PAGE > products.length) {
          return products.length;
        } else return pageEnd + ITEMS_PER_PAGE;
      });
    }
  };
  const removeProduct = (pid) => {
    setProducts(products.filter((item) => item.id !== pid));
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
        <Spinner />
      </Box>
    );
  }

  return (
    <div className="container-edit-back" ref={adminHomeRef}>
      <div className="container-user-edit">
        <div className="profile-header">
          <h2 className="text">Inventory</h2>
          <hr />
          <SearchBar
            onClick={onClick}
            searchData={searchData}
            setSearchData={setSearchData}
            placeHolder="Search Products....."
            width="60%"
            searchActive={searchActive}
          />
        </div>
        {searchActive ? (
          <SearchItem product={searchResult} key={searchResult.id} />
        ) : (
          <>
            <table className="table table-bordered ">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Product Id</th>
                  <th scope="col">Product Title</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Discounted Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Trending</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(page, pageEnd).map((product) => (
                  <AdminProductItem
                    product={product}
                    key={product.id}
                    removeProductHandler={removeProduct}
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

export default AdminHome;
