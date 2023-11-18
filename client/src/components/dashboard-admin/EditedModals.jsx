/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
   Button,
   ModalOverlay,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   FormControl,
   FormLabel,
   Input,
   Select,
   Textarea,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";

export const EditedModals = ({
   headers,
   onClose,
   edited,
   handleSubmitEdit,
   handleImage,
   find,
}) => {
   console.log(headers);
   console.log(edited);
   const getAllCategories = useSelector((state) => state.categories.value);
   const getAllSubCategories = useSelector(
      (state) => state.subCategories.value
   );
   return (
      <>
         <ModalOverlay />
         <ModalContent>
            <Formik
               initialValues={edited}
               onSubmit={(values, action) => {
                  handleSubmitEdit(values), action.resetForm();
               }}>
               {(props) => {
                  const { values, handleChange, isSubmitting } = props;
                  {
                     console.log(values);
                  }
                  return (
                     <Form>
                        <ModalHeader>Edit {headers.first}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                           <FormControl>
                              <FormLabel>{headers.first}</FormLabel>
                              <Input
                                 placeholder={headers.first}
                                 type="text"
                                 isRequired
                                 name="name"
                                 onChange={handleChange}
                                 value={values.name}
                              />
                           </FormControl>
                           {headers.first ==
                           "Category" ? null : headers.first ==
                             "Sub Category" ? (
                              <FormControl mt={4}>
                                 <FormLabel>{headers.second}</FormLabel>
                                 <Select
                                    onChange={handleChange}
                                    name="CategoryId"
                                    isRequired
                                    value={values.CategoryId}>
                                    {getAllCategories?.map((categories) => (
                                       <option
                                          key={categories.id}
                                          value={categories.id}>
                                          {categories.name}
                                       </option>
                                    ))}
                                 </Select>
                              </FormControl>
                           ) : (
                              <>
                                 <FormControl>
                                    <FormLabel>Price</FormLabel>
                                    <Input
                                       placeholder='example: 20'
                                       name="price"
                                       value={values.price}
                                       onChange={handleChange}
                                    />
                                 </FormControl>
                                 <FormControl>
                                    <FormLabel>Quantity</FormLabel>
                                    <Input
                                       placeholder={headers.first}
                                       onChange={handleChange}
                                       name="stock_quantity"
                                       isRequired
                                       value={values.stock_quantity}
                                    />
                                 </FormControl>
                                 <FormControl>
                                    <FormLabel>Image</FormLabel>
                                    <Input
                                       name="image"
                                       type="file"
                                       onChange={(e) => handleImage(e)}
                                       value={values.image}
                                    />
                                 </FormControl>
                                 <FormControl mt={4}>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                       onChange={handleChange}
                                       name="CategoryId"
                                       isRequired
                                       placeholder="Select a category"
                                       value={values.CategoryId}>
                                       {getAllCategories?.map((categories) => (
                                          <option
                                             key={categories.id}
                                             value={categories.id}>
                                             {categories.name}
                                          </option>
                                       ))}
                                    </Select>
                                 </FormControl>
                                 <FormControl mt={4}>
                                    <FormLabel>Sub category</FormLabel>
                                    <Select
                                       onChange={handleChange}
                                       name="SubCategoryId"
                                       isRequired
                                       placeholder="Select subcategory"
                                       value={values.SubCategoryId}>
                                       {getAllSubCategories?.map(
                                          (subCategories) => (
                                             <option
                                                key={subCategories.id}
                                                value={subCategories.id}>
                                                {subCategories.name}
                                             </option>
                                          )
                                       )}
                                    </Select>
                                 </FormControl>
                                 <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                       name="description"
                                       onChange={handleChange}
                                       value={values.description}
                                    />
                                 </FormControl>
                              </>
                           )}
                        </ModalBody>

                        <ModalFooter>
                           <Button
                              colorScheme="orange"
                              mr={3}
                              type="submit"
                              onSubmit={handleSubmitEdit}
                              onClick={() => {
                                 onClose();
                                 find();
                              }}>
                              Save
                           </Button>
                           <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                     </Form>
                  );
               }}
            </Formik>
         </ModalContent>
      </>
   );
};
