import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Searchbar.css";

const SearchBar = ({
  onClick,
  searchData,
  setSearchData,
  placeHolder,
  width,
  searchActive,
}) => {
  const hoverEffect = () => {
    const searchbarContainer =
      document.getElementById("searchbarContainer").classList;
    searchbarContainer.toggle("searchbar-container-hover");
  };

  const onChange = (e) => {
    const { value } = e.target;
    setSearchData(value);
  };
  return (
    <div className="d-flex justify-content-center w-100">
      <div
        className="searchbar-container"
        id="searchbarContainer"
        style={{ width: width }}
      >
        <input
          type="text"
          className="search-box"
          label="Search"
          onChange={onChange}
          style={{ marginRight: "8px" }}
          placeholder={placeHolder}
          value={searchData}
        />
        <button
          className="search-button"
          onMouseEnter={hoverEffect}
          onMouseLeave={hoverEffect}
          onClick={() => {
            onClick();
          }}
        >
          {searchActive ? (
            <b style={{ color: "white" }}>X</b>
          ) : (
            <SearchIcon style={{ color: "white" }} />
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
