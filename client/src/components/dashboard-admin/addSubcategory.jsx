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

export const AddSubCategory = () => {
   const subCategory = [
      {
         nama: "kopi",
      },
      {
         nama: "teh",
      },
      {
         nama: "manisan",
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
               <FormHelperText>example : Bread</FormHelperText>
            </FormControl>
            <Button bg={"orange"} _hover={{ bg: "orange.300" }} w={"13%"}>
               <AiOutlinePlus />
            </Button>
         </Flex>
         <Tables
            data={subCategory}
            name="nama"
            headers={{
               first: "Sub Category",
               second: "Category",
               third: "Product",
            }}
         />
      </Stack>
   );
};
