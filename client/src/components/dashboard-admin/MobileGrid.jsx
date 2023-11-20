/* eslint-disable react/prop-types */
import { Grid, GridItem } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { useState } from "react";
import { AddCategory } from "./addCategory";
import { ProductMenuAdmin } from "./ProductMenuAdmin";
import { AddSubCategory } from "./addSubcategory";
import { AddProduct } from "./addProduct";
import { Reports } from "./Reports";
import { Trash } from "./Trash";

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
            {props.main == 0 ? (
               <ProductMenuAdmin />
            ) : props.main == 1 ? (
               <Reports />
            ) : props.main == 2 ? (
               props.main
            ) : props.main == 3 ? (
               <AddCategory
                  handleEdit={props.handleEdit}
                  valueId={props.valueId}
               />
            ) : props.main == 4 ? (
               <AddSubCategory
                  fetchCategory={props.fetchCategory}
                  handleEdit={props.handleEdit}
                  valueId={props.valueId}
                  filterCategory={props.filterCategory}
                  filterSubCategory={props.filterSubCategory}
               />
            ) : props.main == 5 ? (
               <AddProduct
                  fetchCategory={props.fetchCategory}
                  fetchSubCategory={props.fetchSubCategory}
                  setMain={props.setMain}
                  handleEdit={props.handleEdit}
                  valueId={props.valueId}
                  filterCategory={props.filterCategory}
                  filterSubCategory={props.filterSubCategory}
               />
            ) : (
               <Trash />
            )}
         </GridItem>
      </Grid>
   );
};
