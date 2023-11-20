/* eslint-disable react/prop-types */
import {
   FormControl,
   InputGroup,
   Input,
   FormHelperText,
   InputRightElement,
   FormLabel,
   Text,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
export const SearchProducts = ({ searchRef, setSearchProducts, count }) => {
   return (
      <>
         <FormControl w={"30%"}>
            <FormLabel>Search Product</FormLabel>
            <InputGroup>
               <Input
                  type="text"
                  ref={searchRef}
                  onChange={(e) => setSearchProducts(e.target.value)}
               />
               <InputRightElement as={"button"}>
                  <CiSearch />
               </InputRightElement>
            </InputGroup>
            <FormHelperText>example : Aren latte</FormHelperText>
         </FormControl>
         <Text w={"50%"}>Total product : {count} </Text>
      </>
   );
};
