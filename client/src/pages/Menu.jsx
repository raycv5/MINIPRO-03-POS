import { Grid, GridItem } from "@chakra-ui/react";
import MainContent from "../components/menu/MainContent";
import Cart from "../components/menu/Cart";
import Sidebar from "../components/menu/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const Menu = () => {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");
  const name = queryParams.get("name");
  const sort = queryParams.get("sort");

  const getProducts = async () => {
    let url = `http://localhost:2000/product?page=${currentPage}&limit=${itemsPerPage}`;
    if (categoryId) {
      url += `${url.includes("?") ? "&" : "?"}category=${categoryId}`;
    }
    if (name) {
      url += `${url.includes("?") ? "&" : "?"}name=${name}`;
    }
    if (sort) {
      url += `${url.includes("?") ? "&" : "?"}sort=${sort}`;
    }

    try {
      const response = await axios.get(url);
      setProduct(response?.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const getCarts = async () => {
    try {
      const response = await axios.get("http://localhost:2000/carts/1"); // CHANGE THE ID LATER
      setCart(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
    getCarts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Grid
      templateAreas={"sidebar main cart"}
      gridTemplateColumns={{
        base: "0% 1fr 0",
        lg: "5% 1fr 28%",
        xl: "7% 1fr 23%",
      }}
      height="100%"
    >
      <GridItem>
        <Sidebar area={"sidebar"} />
      </GridItem>
      <GridItem>
        <MainContent
          area={"main"}
          product={product}
          getProducts={getProducts}
          getCarts={getCarts}
          category={category}
          setCategory={setCategory}
          categoryId={categoryId}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      </GridItem>
      <GridItem>
        <Cart
          area={"cart"}
          getProducts={getProducts}
          cart={cart}
          getCarts={getCarts}
        />
      </GridItem>
    </Grid>
  );
};
