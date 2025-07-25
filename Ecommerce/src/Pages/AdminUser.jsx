import React, { useState, useEffect, useContext, useRef } from "react";
import UserService from "../Components/Data/UserService";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import AdminUserItem from "../Components/Admin/AdminUserItem";
import { UserContext } from "../Context/UserContext";
import SearchBar from "../Components/Searchbar/Searchbar";
import SearchUser from "../Components/Admin/SearchUser";

const AdminUser = () => {
  const ITEMS_PER_PAGE = 8;
  const [users, setUsers] = useState([]);
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
    const fetchUsers = async () => {
      if (await isAdmin()) {
        try {
          const response = await UserService.getAllUsers();
          const usersData = response.data;

          const adminUsersPromises = usersData.map(async (item) => {
            const isAdmin = (await UserService.isAdminByUid(item.email)).data;
            return !isAdmin ? item : null;
          });

          const adminUsers = (await Promise.all(adminUsersPromises)).filter(
            (user) => user !== null
          );
          setUsers(adminUsers);

          setTimeout(() => setLoading(false), 500);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      } else {
        navigate("/404");
      }
    };

    fetchUsers();
  }, [navigate]);

  useEffect(() => {
    setTotalPages(Math.ceil(users.length / ITEMS_PER_PAGE));
  }, [users]);

  const onClick = async () => {
    if (!searchActive) {
      setLoading(true);
      if (searchData !== "") {
        setSearchActive(true);
        const response = await UserService.getUserById(searchData);
        setSearchResult(response.data);
        if (Object.keys(response.data).length !== 0) {
          setTimeout(() => setLoading(false), 300);
        } else {
          setSearchActive(false);
          handleShowSnackbar("No User Found!", "info");
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
        if (pageEnd + ITEMS_PER_PAGE > users.length) {
          return users.length;
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

  const removeUser = (uid) => {
    setUsers(users.filter((item) => item.uid !== uid));
  };

  return (
    <div className="container-edit-back" ref={adminHomeRef}>
      <div className="container-user-edit">
        <div className="profile-header">
          <h2 className="text">Users</h2>
          <hr />
          <SearchBar
            onClick={onClick}
            searchData={searchData}
            setSearchData={setSearchData}
            placeHolder="Search Users....."
            width="60%"
            searchActive={searchActive}
          />
        </div>
        {searchActive ? (
          <SearchUser user={searchResult} key={searchResult.uid} />
        ) : (
          <>
            <table className="table table-bordered ">
              <thead className="thead-light">
                <tr>
                  <th scope="col">User Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Address</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Status Icon</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(page, pageEnd).map((user, k) => (
                  <AdminUserItem
                    user={user}
                    removeUserHandler={removeUser}
                    key={k}
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

export default AdminUser;
