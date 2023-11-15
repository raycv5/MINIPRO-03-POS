import { Flex, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaBurger } from "react-icons/fa6";

export const ProductCategory = () => {
   const [categoryId, setCategoryId] = useState(null);
   const handleCategory = (categoryId) => {
      setCategoryId(categoryId);
   };
   console.log(categoryId);
   const category = [
      { name: "Food", icon: <FaBurger /> },
      { name: "Food", icon: <FaBurger /> },
      { name: "Food", icon: <FaBurger /> },
      { name: "Food", icon: <FaBurger /> },
      { name: "Food", icon: <FaBurger /> },
      { name: "Food", icon: <FaBurger /> },
   ];

   return (
      <Stack>
         <Flex
            w={"30%"}
            flexDir={"column"}
            m={{ base: "0", md: "0 10%", lg: "0 10%" }}
            p={"10% 80%"}
            bg={"white"}
            rounded={"10px"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"10px"}>
            <Text>Category</Text>
            {category.map((category, index) => (
               <Flex key={category} onClick={() => handleCategory(index)}>
                  <Stack
                     p={"10px"}
                     gap={"0px"}
                     cursor={"pointer"}
                     _hover={{ bg: "orange" }}
                     alignItems={"center"}
                     rounded={"10px"}>
                     {category.icon}
                     <Text>{category.name}</Text>
                  </Stack>
               </Flex>
            ))}
         </Flex>
      </Stack>
   );
};
