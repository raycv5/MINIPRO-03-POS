/* eslint-disable react/prop-types */
import { Grid, GridItem } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { useState } from "react";
import { AddCategory } from "./addCategory";

export const MobileGrid = (props) => {
   const [search, setSearch] = useState("");
   const handleChange = (e) => {
      setSearch(e.target.value);
   };
   console.log(search);
   return (
      <Grid
         templateAreas={`"header header header"
                  "main main main"
                  "main main main"`}
         gridTemplateRows={"50px 1fr 30px"}
         gridTemplateColumns={"100px 1fr 200px"}
         h="100vh"
         bg={"gray.100"}
         color="blackAlpha.700">
         <GridItem area={"header"}>
            <Navbar
               handleChange={handleChange}
               isOpen={props.isOpen}
               onClose={props.onClose}
               onOpen={props.onOpen}
               handleClick={props.handleClick}
               sidebar={props.sidebar}
            />
         </GridItem>
         <GridItem p="3%" area={"main"}>
            {props.main == 4 ? <AddCategory /> : props.main}
         </GridItem>
      </Grid>
   );
};