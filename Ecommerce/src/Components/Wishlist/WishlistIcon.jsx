import React, { useState, useEffect, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WishlistService from "../Data/WishlistService";
import { UserContext } from "../../Context/UserContext";

const WishlistIcon = (props) => {
  const [clicked, setClicked] = useState(false);
  const [isHeartScaled, setScaled] = useState(false);
  const { checkUser, handleShowSnackbar } = useContext(UserContext);

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const data = { pid: props.pid };
        const response = await WishlistService.itemExists(data);
        setClicked(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    checkWishlist();
  }, [props.pid]);

  const removeItem = async () => {
    const data = { pid: props.pid };
    try {
      await WishlistService.removeItem(data);
      setClicked(!clicked);
    } catch (error) {
      console.error(error);
    }
  };
  const addItem = async () => {
    try {
      const data = { pid: props.pid };
      await WishlistService.additem(data);
      setClicked(!clicked);
    } catch (error) {
      console.error(error);
    }
  };
  const handleHeartClick = async (e) => {
    setScaled(true);
    setTimeout(() => {
      setScaled(false);
    }, 200);
    e.stopPropagation();
    if (checkUser()) {
      clicked ? await removeItem() : await addItem();
    } else handleShowSnackbar("You Have To Be Logged In", "warning");
  };

  const styles = {
    color: clicked ? "#F27BBD" : "#56d8e4",
    transition: ".2s",
  };

  return (
    <IconButton onClick={handleHeartClick}>
      <FavoriteIcon
        style={styles}
        sx={{ transform: isHeartScaled ? "scale(1.5)" : "scale(1.0)" }}
      />
    </IconButton>
  );
};

export default WishlistIcon;
