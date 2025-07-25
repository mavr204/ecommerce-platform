import { React, useEffect, useContext, useState } from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewArrivals from "../Components/NewArrivals/NewArrivals";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import Box from "@mui/material/Box";
import Spinner from "../Components/Icons/Spinner";

const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);

    return () => clearTimeout(timer);
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
        <Spinner />
      </Box>
    );
  }
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewArrivals />
      <NewsLetter />
    </div>
  );
};

export default Home;
