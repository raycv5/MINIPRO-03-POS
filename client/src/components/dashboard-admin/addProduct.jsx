import {
   Flex,
   FormControl,
   FormLabel,
   FormHelperText,
   Input,
   Button,
   Stack,
} from "@chakra-ui/react";
import { Tables } from "./Tables";
import { AiOutlinePlus } from "react-icons/ai";

export const AddProduct = () => {
   const subCategory = [
      {
         nama: "Beef Burger",
      },
      {
         nama: "Aren Latte",
      },
      {
         nama: "Matcha",
      },
   ];
   return (
      <Stack
         bg={"white"}
         h={"100vh"}
         rounded={"20px"}
         p={"50px 3%"}
         m={"0 30px 0 0"}>
         <Flex w={"50%"} alignItems={"center"} gap={"20px"}>
            <FormControl>
               <FormLabel>Add product</FormLabel>
               <Input type="text" />
               <FormHelperText>example : Beef Burger</FormHelperText>
            </FormControl>
            <Button bg={"orange"} _hover={{ bg: "orange.300" }} w={"13%"}>
               <AiOutlinePlus />
            </Button>
         </Flex>
         <Tables
            data={subCategory}
            name="nama"
            headers={{
               first: "Product",
               second: "Sub Category",
               third: "Category",
            }}
         />
      </Stack>
   );
};
