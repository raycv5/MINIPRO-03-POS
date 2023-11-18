/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
   Flex,
   FormControl,
   FormLabel,
   FormHelperText,
   Input,
   Button,
   Stack,
   Select,
   Text,
   HStack,
   InputRightElement,
   InputGroup,
   useToast,
} from "@chakra-ui/react";
import { Tables } from "./Tables";
import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";

export const AddSubCategory = ({ handleEdit, valueId }) => {
   const [isSubmitting, setIsSubmitting] = useState(true);
   const toast = useToast();
   const getAllCategories = useSelector((state) => state.categories.value);
   // console.log(getAllCategories)
   const searchRef = useRef();
   const [searchSubCategory, setSearchSubCategory] = useState("");
   const [getSubCategory, setGetSubCategory] = useState([]);
   const [subCategories, setsubCategories] = useState({
      name: "",
      CategoryId: "",
      AdminId: 1,
   });

   const findSubCategories = async () => {
      try {
         const subCategories = await axios.get(
            `http://localhost:2000/subcategories?name=${searchSubCategory}`
         );
         setGetSubCategory(subCategories.data);
         setIsSubmitting(false);
      } catch (error) {
         console.log(error);
      }
   };
   const handleSubmit = async (data) => {
      try {
         await axios.post(`http://localhost:2000/subcategories/`, data);
         findSubCategories();
         toast({
            title: "Success",
            description: "Subcategory has been added",
            status: "success",
            duration: 5000,
            position: "top-left",
            isClosable: true,
         });
      } catch (error) {
         console.log(error);
         toast({
            title: "Error",
            description: `${error.response.data}`,
            status: "error",
            duration: 5000,
            position: "top-left",
            isClosable: true,
         });
      }
   };
   const editSubCategory = async (editValues) => {
      editValues.id = valueId;
      try {
         await axios.patch(
            `http://localhost:2000/subcategories/${valueId}`,
            editValues
         );
         findSubCategories();
         toast({
            title: "Success",
            description: "Subcategory has been edited",
            status: "success",
            duration: 5000,
            position: "top-left",
            isClosable: true,
         });
      } catch (error) {
         console.log(error);
         toast({
            title: "Success",
            description: `${error.response.data}`,
            status: "success",
            duration: 5000,
            position: "top-left",
            isClosable: true,
         });
      }
   };
   const deletedSubCategory = async () => {
      try {
         await axios.patch(
            `http://localhost:2000/subcategories/delete/${valueId}`
         );
         findSubCategories()
         toast({
            title: "Success",
            description: "Subcategory has been deleted",
            status: "success",
            duration: 5000,
            position: "top-left",
            isClosable: true,
         });
      } catch (error) {
         console.log(error);
         toast({
            title: "Success",
            description: `${error.response.data}`,
            status: "success",
            duration: 5000,
            position: "top-left",
            isClosable: true,
         });
      }
   };
   useEffect(() => {
      findSubCategories();
   }, [searchSubCategory]);
   return (
      <Stack
         bg={"white"}
         h={"100vh"}
         rounded={"20px"}
         p={"50px 3%"}
         m={"0 30px 0 0"}>
         <Flex
            w={"100%"}
            alignItems={"center"}
            gap={"20px"}
            justifyContent={"space-between"}>
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
            <HStack>
               <Formik
                  initialValues={subCategories}
                  onSubmit={(values, action) => {
                     handleSubmit(values);
                     action.resetForm;
                  }}>
                  {(props) => {
                     const { handleChange, values } = props;
                     return (
                        <Form>
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
                                 <FormHelperText>
                                    example : Bread
                                 </FormHelperText>
                              </FormControl>
                              <FormControl id="CategoryId" isRequired>
                                 <FormLabel>Category</FormLabel>
                                 <Select
                                 placeholder="Select Category"
                                    onChange={handleChange}
                                    value={values.CategoryId}>
                                    {getAllCategories?.map((categories) => (
                                       <option
                                          key={categories.id}
                                          value={categories.id}>
                                          {categories.name}
                                       </option>
                                    ))}
                                 </Select>
                                 <FormHelperText>
                                    Choose category
                                 </FormHelperText>
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
                        </Form>
                     );
                  }}
               </Formik>
            </HStack>
         </Flex>
         <Tables
            data={getSubCategory}
            find={findSubCategories}
            name="name"
            headers={{
               first: "Sub Category",
            }}
            count={getSubCategory.length}
            handleEdit={handleEdit}
            edited={subCategories}
            handleSubmitEdit={editSubCategory}
            handleSubmitDeleted={deletedSubCategory}
            loading={isSubmitting}
         />
      </Stack>
   );
};
