/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Stack, HStack, useToast } from "@chakra-ui/react";
import { Tables } from "./Tables";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import { FromProducts } from "./FormAddProducts";
import { useLocation } from "react-router-dom";

export const AddProduct = ({
   handleEdit,
   valueId,
   filterCategory,
   filterSubCategory,
}) => {
   const toast = useToast();
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
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const categoryId = queryParams.get("category");
   const name = queryParams.get("name");
   const sort = queryParams.get("sort");
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;

   const findProduct = async () => {
      let url = `http://localhost:2000/product?page=${currentPage}&limit=${itemsPerPage}`;
      if (categoryId) {
         url += `${url.includes("?") ? "&" : "?"}category=${categoryId}`;
      }
      if (name) {
         url += `${url.includes("?") ? "&" : "?"}name=${name}`;
      }
      if (sort) {
         url += `${url.includes("?") ? "&" : "?"}sort=${sort}`;
      }

      try {
         const response = await axios.get(url);
         const filteredProduct = response?.data.filter(
            (product) => product.isDeleted === false
         );
         setGetProduct(filteredProduct);
         setLoading(false);
      } catch (err) {
         console.error("Error fetching products:", err);
      }
   };
   console.log(getProduct);

   useEffect(() => {
      findProduct();
   }, []);

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
            {/* <SearchProducts
               count={getProduct.length}
               searchRef={searchRef}
               setSearchProducts={setSearchProducts}
            /> */}
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
