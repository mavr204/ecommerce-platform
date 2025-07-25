import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import ProductService from "../Data/ProductService";
import GreenCheck from "../Icons/GreenCheck";

const AdminProductItem = ({ product, removeProductHandler }) => {
  const [loading, setLoading] = useState(false);

  const removeProduct = async (pid) => {
    try {
      setLoading(true);
      await ProductService.removeProduct(pid);
      removeProductHandler(pid);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error deleting product:", error);
    }
  };

  const setPopular = async (pid, popular) => {
    try {
      await ProductService.setPopular(pid, popular);
    } catch (error) {
      console.error("Error setting popular status:", error);
    }
  };

  const onChangePopular = async (e) => {
    const { value } = e.target;
    setLoading(true);
    await setPopular(product.id, value);
    setTimeout(() => setLoading(false), 200);
    product.popular = !product.popular;
  };

  return (
    <tr>
      <td className="table-data">{product.id}</td>
      <td
        className="table-data"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/products/" + product.id);
        }}
      >
        {product.title}
      </td>
      <td className="table-data">
        <img
          style={{ width: "50px" }}
          src={product.image}
          alt={product.title}
        />
      </td>
      <td className="table-data">{product.price}</td>
      <td className="table-data">{product.discountedPrice}</td>
      <td className="table-data">{product.category}</td>
      <td className="table-data">
        <form>
          <select
            name="popular"
            id="popular"
            value={product.popular}
            onChange={onChangePopular}
            disabled={loading}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </form>
      </td>
      <td className="table-data">
        <button
          disabled={loading}
          onClick={() => {
            removeProduct(product.id);
          }}
          className="btn btn-danger"
          style={{
            width: "fit-content",
            padding: ".2em .4em",
            margin: "7px",
          }}
        >
          <DeleteIcon />
        </button>
      </td>
      <td className="table-data">
        {loading ? (
          <CircularProgress />
        ) : (
          <GreenCheck style={{ fontSize: 25 }} />
        )}
      </td>
    </tr>
  );
};

export default AdminProductItem;
