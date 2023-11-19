/* eslint-disable react/prop-types */
import { Stack, HStack, useToast } from "@chakra-ui/react";
import { Tables } from "./Tables";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import { FromProducts } from "./FormAddProducts";
import { SearchProducts } from "./SearchProducts";

export const AddProduct = ({
   handleEdit,
   valueId,
   filterCategory,
   filterSubCategory,
   fetchCategory,
   fetchSubCategory,
}) => {
   const toast = useToast();
   const searchRef = useRef();
   const [searchProducts, setSearchProducts] = useState("");
   const [getProduct, setGetProduct] = useState([]);
   const [loading, setLoading] = useState(true);

   const [data] = useState({
      name: "",
      description: "",
      price: null,
      stock_quantity: null,
      CategoryId: null,
      SubCategoryId: null,
      AdminId: 1,
   });
   const [image, setImage] = useState(null);
   const handleImage = (e) => {
      setImage(e.target.files[0]);
   };
   const findProduct = async () => {
      try {
         const product = await axios.get(
            `http://localhost:2000/product?name=${searchProducts}`
         );
         const filterProduct = product.data.filter(
            (product) => product.isDeleted === false
         );
         setGetProduct(filterProduct);
         setLoading(false);
         fetchCategory();
         fetchSubCategory();
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      findProduct();
   }, [searchProducts]);

   const handleSubmit = async (data) => {
      try {
         let formData = new FormData();
         formData.append("name", data.name);
         formData.append("description", data.description);
         formData.append("stock_quantity", data.stock_quantity);
         formData.append("price", data.price);
         formData.append("CategoryId", data.CategoryId);
         formData.append("file", image);
         formData.append("SubCategoryId", data.SubCategoryId);
         formData.append("AdminId", data.AdminId);
         await axios.post(`http://localhost:2000/product`, formData);
         toast({
            title: "Success",
            description: `Product created successfully`,
            status: "success",
            duration: 5000,
            position: "top-left",
            isClosable: true,
         });
         findProduct();
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
   const editedProduct = async (editValues) => {
      editValues.id = valueId;
      console.log(editValues);
      try {
         let formData = new FormData();
         formData.append("name", editValues.name);
         formData.append("description", editValues.description);
         formData.append("stock_quantity", editValues.stock_quantity);
         formData.append("price", editValues.price);
         formData.append("CategoryId", editValues.CategoryId);
         formData.append("file", image);
         formData.append("SubCategoryId", editValues.SubCategoryId);
         await axios.patch(
            `http://localhost:2000/product/${valueId}`,
            formData
         );
         toast({
            title: "Success",
            description: "Product has been deleted ",
            status: "success",
            duration: 5000,
            position: "top-left",
            isClosable: true,
         });
         findProduct();
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
   const deletedProduct = async () => {
      try {
         await axios.patch(`http://localhost:2000/product/delete/${valueId}`);
         toast({
            title: "Success",
            description: "Product has been deleted ",
            status: "success",
            duration: 5000,
            position: "top-left",
            isClosable: true,
         });
         findProduct();
      } catch (error) {
         console.log(error);
         toast({
            title: "error",
            description: `${error.response.data}`,
            status: "error",
            duration: 5000,
            position: "top-left",
            isClosable: true,
         });
      }
   };
   return (
      <Stack
         bg={"white"}
         h={"100%"}
         rounded={"20px"}
         p={"50px 3%"}
         m={"0 30px 0 0"}>
         <Formik
            initialValues={data}
            onSubmit={(values, action) => {
               handleSubmit(values);
               action.resetForm();
            }}>
            {(props) => {
               const { handleChange, values } = props;
               {
                  console.log(values);
               }
               return (
                  <Form>
                     <FromProducts
                        handleChange={handleChange}
                        values={values}
                        getAllCategories={filterCategory}
                        getAllSubCategories={filterSubCategory}
                        handleImage={handleImage}
                        handleSubmit={handleSubmit}
                        loading={loading}
                     />
                  </Form>
               );
            }}
         </Formik>
         <HStack justifyContent={"space-between"}>
            <SearchProducts
               count={getProduct.length}
               searchRef={searchRef}
               setSearchProducts={setSearchProducts}
            />
         </HStack>
         <Tables
            filterCategory={filterCategory}
            filterSubCategory={filterSubCategory}
            handleImage={handleImage}
            handleEdit={handleEdit}
            count={getProduct.length}
            data={getProduct}
            find={findProduct}
            edited={data}
            name="name"
            handleSubmitEdit={editedProduct}
            handleSubmitDeleted={deletedProduct}
            loading={loading}
            headers={{
               first: "Product",
            }}
         />
      </Stack>
   );
};
