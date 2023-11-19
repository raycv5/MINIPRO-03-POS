/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Flex, Stack, HStack, useToast } from "@chakra-ui/react";
import { Tables } from "./Tables";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Form, Formik } from "formik";
import { FormAddSubCategory } from "./FromAddSubcategory";
import { SearchSubCategory } from "./SearchSubCategory";

export const AddSubCategory = ({
   handleEdit,
   valueId,
   filterCategory,
   fetchCategory,
}) => {
   const [isSubmitting, setIsSubmitting] = useState(true);
   const toast = useToast();
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
         const filterSubCategories = subCategories.data.filter(
            (subCategory) => subCategory.isDeleted === false
         );
         setGetSubCategory(filterSubCategories);
         setIsSubmitting(false);
         fetchCategory();
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
         findSubCategories();
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
            <SearchSubCategory
               searchRef={searchRef}
               getSubCategory={getSubCategory}
               setSearchSubCategory={setSearchSubCategory}
            />
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
                           <FormAddSubCategory
                              handleChange={handleChange}
                              getAllCategories={filterCategory}
                              values={values}
                              isSubmitting={isSubmitting}
                           />
                        </Form>
                     );
                  }}
               </Formik>
            </HStack>
         </Flex>
         <Tables
            filterCategory={filterCategory}
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
