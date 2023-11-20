/* eslint-disable react/prop-types */
import {
   Stack,
   FormControl,
   FormLabel,
   InputGroup,
   Input,
   InputRightElement,
   FormHelperText,
   Text,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

export const SearchSubCategory = ({
   searchRef,
   setSearchSubCategory,
   getSubCategory,
}) => {
   return (
      <Stack>
         <FormControl>
            <FormLabel>Search Subcategory</FormLabel>
            <InputGroup>
               <Input
                  type="text"
                  ref={searchRef}
                  onChange={(e) => setSearchSubCategory(e.target.value)}
               />
               <InputRightElement as={"button"}>
                  <CiSearch />
               </InputRightElement>
            </InputGroup>
            <FormHelperText>example : Bread</FormHelperText>
         </FormControl>
         <Text>Total SubCategory: {getSubCategory.length}</Text>
      </Stack>
   );
};
