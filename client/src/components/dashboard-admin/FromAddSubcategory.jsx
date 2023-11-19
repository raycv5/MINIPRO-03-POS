/* eslint-disable react/prop-types */
import {
   Flex,
   FormControl,
   FormLabel,
   FormHelperText,
   Input,
   Button,
   Stack,
   Select,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
export const FormAddSubCategory = ({
   handleChange,
   values,
   getAllCategories,
   isSubmitting,
}) => {
   return (
      <Flex alignItems={"center"} gap={"20px"}>
         <FormControl>
            <FormLabel>Add Sub Category</FormLabel>
            <Input
               type="text"
               name="name"
               isRequired
               onChange={handleChange}
               value={values.name}
            />
            <FormHelperText>example : Bread</FormHelperText>
         </FormControl>
         <FormControl id="CategoryId" isRequired>
            <FormLabel>Category</FormLabel>
            <Select
               placeholder="Select Category"
               onChange={handleChange}
               value={values.CategoryId}>
               {getAllCategories?.map((categories) => (
                  <option key={categories.id} value={categories.id}>
                     {categories.name}
                  </option>
               ))}
            </Select>
            <FormHelperText>Choose category</FormHelperText>
         </FormControl>
         <Stack>
            {!isSubmitting ? (
               <Button
                  type="submit"
                  bg={"orange"}
                  _hover={{ bg: "orange.300" }}>
                  <AiOutlinePlus /> Add Subcategory
               </Button>
            ) : (
               <Button
                  isLoading={isSubmitting}
                  deletedCategory
                  loadingText="Loading"
                  variant="solid">
                  Submiting
               </Button>
            )}
         </Stack>
      </Flex>
   );
};
