import { Grid, GridItem } from "@chakra-ui/react";
import MainContent from "../components/menu/MainContent";
import Cart from "../components/menu/Cart";
import Sidebar from "../components/menu/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Menu = () => {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState([]);

  const { categoryId } = useParams();

  const getProducts = async () => {
    let url = "http://localhost:2000/product?name=";
    if (categoryId) {
      url = `http://localhost:2000/product/category/${categoryId}`;
    }
    try {
      const response = await axios.get(url);
      setProduct(response?.data);
      console.log(response);
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
  }, []);

  return (
    <Grid
      templateAreas={"sidebar main cart"}
      gridTemplateColumns={"7% 1fr 23%"}
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
