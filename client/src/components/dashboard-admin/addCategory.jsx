/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
   Flex,
   FormControl,
   FormLabel,
   FormHelperText,
   Input,
   Stack,
   InputGroup,
   InputRightElement,
   Text,
   useToast,
} from "@chakra-ui/react";
import { Tables } from "./Tables";
import { CiSearch } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { Form, Formik } from "formik";
import axios from "axios";
import { FormCategory } from "./FormCategory";
export const AddCategory = ({ handleEdit, valueId }) => {
   const [getCategory, setGetCategory] = useState([]);
   const [searchCategory, setSearchCategory] = useState("");
   const searchRef = useRef();
   const [isLoading, setLoading] = useState(true);
   // eslint-disable-next-line no-unused-vars
   const [editedCategory, setEditedCategory] = useState({
      name: "",
      AdminId: 1,
   });
   const deletedCategory = async () => {
      try {
         await axios.patch(
            `http://localhost:2000/categories/delete/${valueId}`
         );
         findCategories();
         toast({
            title: "Success",
            description: "Category has been deleted",
            status: "success",
            duration: 5000,
            position: "top-left",
            isClosable: true,
         });
      } catch (error) {
         console.log(error);
      }
   };
   const editCategory = async (editValues) => {
      editValues.id = valueId;
      try {
         await axios.patch(
            `http://localhost:2000/categories/${valueId}`,
            editValues
         );
         findCategories();
         toast({
            title: "Success",
            description: "Category edit successfully",
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
   const findCategories = async () => {
      try {
         const categories = await axios.get(
            `http://localhost:2000/categories?name=${searchCategory}`
         );
         const allCategory = categories.data.filter(
            (category) => category.isDeleted === false
         );
         setGetCategory(allCategory);
         setLoading(false);
      } catch (error) {
         console.log(error);
      }
   };
   const toast = useToast();
   const [categories, setCategories] = useState({
      name: "",
      AdminId: 1,
   });
   const handleSubmit = async (data) => {
      try {
         await axios.post("http://localhost:2000/categories", data);
         toast({
            title: "Success",
            description: "Category added successfully",
            status: "success",
            duration: 5000,
            position: "top-left",
            isClosable: true,
         });
         findCategories();
      } catch (error) {
         console.log(error.response.data);
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
   useEffect(() => {
      findCategories();
   }, [searchCategory]);
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
                  <FormLabel>Category</FormLabel>
                  <InputGroup>
                     <Input
                        type="text"
                        name="name"
                        ref={searchRef}
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                     />
                     <InputRightElement as={"button"}>
                        <CiSearch />
                     </InputRightElement>
                  </InputGroup>
                  <FormHelperText>example : Food</FormHelperText>
               </FormControl>
            </Stack>
            <Text>Total Category:{getCategory.length}</Text>
            <Formik
               initialValues={categories}
               onSubmit={(values, action) => {
                  handleSubmit(values);
                  action.resetForm();
               }}>
               {(props) => {
                  const { handleChange, values } = props;
                  return (
                     <Form>
                        <FormCategory
                           handleChange={handleChange}
                           isLoading={isLoading}
                           values={values}
                        />
                     </Form>
                  );
               }}
            </Formik>
         </Flex>
         <Tables
            find={findCategories}
            data={getCategory}
            name={"name"}
            count={getCategory.length}
            loading={isLoading}
            headers={{
               first: "Category",
            }}
            handleEdit={handleEdit}
            edited={editedCategory}
            handleSubmitDeleted={deletedCategory}
            handleSubmitEdit={editCategory}
         />
      </Stack>
   );
};
