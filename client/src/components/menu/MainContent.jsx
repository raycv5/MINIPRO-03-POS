/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import MenuCard from "./MenuCard";

function MainContent({
   product,
   getProducts,
   getCarts,
   setCategory,
   categoryId,
}) {
   return (
      <Flex flexDirection="column" bgColor="gray.100" height="100%">
         <Navbar
            setCategory={setCategory}
            getProducts={getProducts}
            categoryId={categoryId}
            route={"home"}
         />
         <MenuCard
            product={product}
            getProducts={getProducts}
            getCarts={getCarts}
            categoryId={categoryId}
         />
      </Flex>
   );
}

export default MainContent;
