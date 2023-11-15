import { Grid, GridItem } from "@chakra-ui/react";
import MainContent from "../components/menu/MainContent";
import Cart from "../components/menu/Cart";
import Sidebar from "../components/menu/Sidebar";

export const Menu = () => {
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
        <MainContent area={"main"} />
      </GridItem>
      <GridItem>
        <Cart area={"cart"} />
      </GridItem>
    </Grid>
  );
};
