/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import MenuCard from "./MenuCard";

function MainContent({ product, getProducts }) {
   return (
      <Flex flexDirection="column" bgColor="gray.100" height="100%">
         <Navbar />
         <MenuCard product={product} getProducts={getProducts} />
      </Flex>
   );
}

export default MainContent;
