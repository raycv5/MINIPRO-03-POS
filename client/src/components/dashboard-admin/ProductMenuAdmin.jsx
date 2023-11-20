import { Flex } from "@chakra-ui/react";
import { ProductCategory } from "./ProductCategory";


export const ProductMenuAdmin = () => {
   return (
      <Flex gap={"100px"} w={"100%"} h={"500px"} alignItems={"start"}>
         <ProductCategory />
        
      </Flex>
   );
};
