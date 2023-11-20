/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../menu/Navbar";
import { Flex } from "@chakra-ui/react";
import { ProductCategory } from "./ProductCategory";


import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import MenuCard from "../menu/MenuCard";

export const ProductMenuAdmin = ({
   product,
   getProducts,
   getCarts,
   setCategory,
   categoryId,
}) => {
   console.log(product)
   return (
      <>
         <Navbar
            setCategory={setCategory}
            getProducts={getProducts}
            categoryId={categoryId}
            route={"dashboard-admin"}
         />
         <MenuCard
            product={product}
            getProducts={getProducts}
            categoryId={categoryId}
         />
      </>
   );
};
