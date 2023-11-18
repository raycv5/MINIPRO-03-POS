/* eslint-disable react/prop-types */
import { Stack, HStack } from "@chakra-ui/react";
import { Tables } from "./Tables";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import { FromProducts } from "./FormAddProducts";
import { SearchProducts } from "./SearchProducts";

export const AddProduct = ({ handleEdit, valueId }) => {
   console.log(valueId);
   const getAllCategories = useSelector((state) => state.categories.value);
   const getAllSubCategories = useSelector(
      (state) => state.subCategories.value
   );
   const searchRef = useRef();
   const [searchProducts, setSearchProducts] = useState("");
   const [getProduct, setGetProduct] = useState([]);
   const [loading, setLoading] = useState(true);
   const [data] = useState({
      name: "",
      description: "",
      price: 0,
      stock_quantity: 0,
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
         setGetProduct(product.data);
         setLoading(false);
         getAllCategories;
         getAllSubCategories;
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
         findProduct();
      } catch (error) {
         console.log(error);
      }
   };
   const editedProduct = async (editValues) => {
      editValues.id = valueId;
      console.log(editValues);
      // const currentProduct = await axios.get(
      //    `http://localhost:2000/product/${valueId}`
      // );
      // const hasChanges =
      //    editValues.name !== currentProduct?.data.name ||
      //    editValues.descriptions !== currentProduct?.data.descriptions ||
      //    editValues.stock_quantity !== currentProduct?.data.stock_quantity ||
      //    editValues.price !== currentProduct?.data.price ||
      //    editValues.CategoryId !== currentProduct?.data.CategoryId ||
      //    editValues.SubCategoryId !== currentProduct?.data.SubCategoryId;
      // if (hasChanges) {
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
         findProduct();
      } catch (error) {
         console.log(error);
      }
      // }
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
                        getAllCategories={getAllCategories}
                        getAllSubCategories={getAllSubCategories}
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
               count={getProduct}
               searchRef={searchRef}
               setSearchProducts={setSearchProducts}
            />
         </HStack>
         <Tables
            handleImage={handleImage}
            handleEdit={handleEdit}
            count={getProduct.length}
            data={getProduct}
            find={findProduct}
            edited={data}
            name="name"
            handleSubmitEdit={editedProduct}
            loading={loading}
            headers={{
               first: "Product",
            }}
         />
      </Stack>
   );
};
//  data={getSubCategory}
//       find={findSubCategories}
//       name="name"
//       headers={{
//          first: "Sub Category",
//       }}
//       count={getSubCategory.length}
//       handleEdit={handleEdit}
//       edited={subCategories}
//       handleSubmitEdit={editSubCategory}
//       handleSubmitDeleted={deletedSubCategory}
//       loading={isSubmitting}
