import { Grid, GridItem } from "@chakra-ui/react";
import MainContent from "../components/menu/MainContent";
import Cart from "../components/menu/Cart";
import Sidebar from "../components/menu/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

export const Menu = () => {
  const [product, setProduct] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:2000/product");
      setProduct(response?.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  console.log(product);

  useEffect(() => {
    getProducts();
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
        />
      </GridItem>
      <GridItem>
        <Cart area={"cart"} getProducts={getProducts} />
      </GridItem>
    </Grid>
  );
};
