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

export const AddCategory = () => {
   const category = [
      {
         name: "food",
      },
      {
         name: "drink",
      },
      {
         name: "breakfast",
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
               <FormLabel>Add category</FormLabel>
               <Input type="text" />
               <FormHelperText>example : Food</FormHelperText>
            </FormControl>
            <Button bg={"orange"} _hover={{ bg: "orange.300" }} w={"13%"}>
               <AiOutlinePlus />
            </Button>
         </Flex>
         <Tables
            data={category}
            name={"name"}
            headers={{
               first: "Category",
               second: "Sub Category",
               third: "Product",
            }}
         />
      </Stack>
   );
};
