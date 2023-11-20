/* eslint-disable react/prop-types */
import {
   FormControl,
   FormLabel,
   FormHelperText,
   Input,
   Button,
   Select,
   Grid,
   HStack,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";

export const FromProducts = ({
   handleChange,
   values,
   handleImage,
   getAllCategories,
   getAllSubCategories,
   loading,
}) => {
   return (
      <Grid w={"100%"} templateColumns={"repeat(4, 1fr)"} gap={"10px"}>
         <FormControl id="name" isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input type="text" onChange={handleChange} value={values.name} />
            <FormHelperText fontSize={"12px"}>
               example : Beef Burger
            </FormHelperText>
         </FormControl>
         <FormControl id="stock_quantity" isRequired>
            <FormLabel>Quantity</FormLabel>
            <Input
               type="number"
               onChange={handleChange}
               value={values.stock_quantity}
            />
            <FormHelperText fontSize={"12px"}>example : 20</FormHelperText>
         </FormControl>
         <FormControl id="price" isRequired>
            <FormLabel>Price</FormLabel>
            <Input type="number" onChange={handleChange} value={values.price} />
            <FormHelperText fontSize={"12px"}>example : 20000</FormHelperText>
         </FormControl>
         <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Input
               type="text"
               onChange={handleChange}
               value={values.description}
            />
            <FormHelperText fontSize={"12px"}>example : Homade</FormHelperText>
         </FormControl>
         <FormControl id="image" isRequired>
            <FormLabel>Image</FormLabel>
            <Input
               name="image"
               type="file"
               onChange={(e) => handleImage(e)}
               value={values.image}
            />
            <FormHelperText fontSize={"12px"}>
               require: png, jpeg, jpg
            </FormHelperText>
         </FormControl>
         <FormControl isRequired>
            <FormLabel id="CategoryId">Category</FormLabel>
            <Select
               value={values.CategoryId}
               onChange={handleChange}
               name="CategoryId"
               placeholder="Select category">
               {getAllCategories?.map((categories) => (
                  <option key={categories.id} value={categories.id}>
                     {categories.name}
                  </option>
               ))}
            </Select>
            <FormHelperText fontSize={"12px"}>Choose category</FormHelperText>
         </FormControl>
         <FormControl isRequired>
            <FormLabel id="SubCategoryId">Sub Category</FormLabel>
            <Select
               onChange={handleChange}
               name="SubCategoryId"
               value={values.SubCategoryId}
               placeholder="Select subcategory">
               {getAllSubCategories?.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                     {subCategory.name}
                  </option>
               ))}
            </Select>
            <FormHelperText fontSize={"12px"}>
               Choose sub category
            </FormHelperText>
         </FormControl>
         <HStack>
            {!loading ? (
               <Button
                  type="submit"
                  bg={"orange"}
                  _hover={{ bg: "orange.300" }}>
                  <AiOutlinePlus /> Add Product
               </Button>
            ) : (
               <Button
                  isLoading={loading}
                  deletedCategory
                  loadingText="Loading"
                  variant="solid">
                  Submiting
               </Button>
            )}
         </HStack>
      </Grid>
   );
};
