/* eslint-disable react/prop-types */
import {
   Text,
   Tabs,
   TabList,
   Tab,
   TabPanel,
   TabPanels,
   Flex,
   Stack,
   StackDivider,
   IconButton,
} from "@chakra-ui/react";
import { LiaTrashRestoreSolid } from "react-icons/lia";

export const TabsTrash = ({
   filteredCategories,
   filteredSubCategories,
   filteredProduct,
   restoreCategory,
   restoresubCategory,
   restoreproduct,
   getCategory,
   getSubCategory,
   getproduct,
}) => {
   console.log(filteredProduct);
   return (
      <Tabs bg={"white"} m={"0 2%"} p={"20px"} rounded={"10px"}>
         <Text fontSize={"20px"} m={"0 15px"} fontWeight={"bold"}>
            Trash
         </Text>
         <TabList>
            <Tab>Categories</Tab>
            <Tab>Sub Categories</Tab>
            <Tab>Product</Tab>
         </TabList>
         <TabPanels p="2rem">
            <TabPanel>
               <Stack
                  gap={"10px"}
                  justifyContent={"center"}
                  divider={<StackDivider borderColor="gray.200" />}>
                  {filteredCategories?.length > 0 ? (
                     filteredCategories?.map((category) => (
                        <Flex
                           p={"0 30px"}
                           justifyContent={"space-between"}
                           key={category.id}>
                           <Text>{category.name}</Text>
                           <Text>
                              <IconButton
                                 onClick={() => {
                                    restoreCategory(category.id);
                                    getCategory();
                                 }}
                                 size="md"
                                 icon={<LiaTrashRestoreSolid />}
                                 bg={"green.200"}
                                 _hover={{ bg: "green.400" }}
                              />
                              Restore
                           </Text>
                        </Flex>
                     ))
                  ) : (
                     <Text>Empty item</Text>
                  )}
               </Stack>
            </TabPanel>
            <TabPanel>
               <Stack
                  gap={"10px"}
                  justifyContent={"center"}
                  divider={<StackDivider borderColor="gray.200" />}>
                  {filteredSubCategories?.length > 0 ? (
                     filteredSubCategories?.map((subCategory) => (
                        <Flex
                           p={"0 30px"}
                           justifyContent={"space-between"}
                           key={subCategory.id}>
                           <Text>{subCategory.name}</Text>
                           <Text>
                              <IconButton
                                 onClick={() => {
                                    restoresubCategory(subCategory.id);
                                    getSubCategory();
                                 }}
                                 size="md"
                                 icon={<LiaTrashRestoreSolid />}
                                 bg={"green.200"}
                                 _hover={{ bg: "green.400" }}
                              />
                              Restore
                           </Text>
                        </Flex>
                     ))
                  ) : (
                     <Text>Empty item</Text>
                  )}
               </Stack>
            </TabPanel>
            <TabPanel>
               <Stack
                  gap={"10px"}
                  justifyContent={"center"}
                  divider={<StackDivider borderColor="gray.200" />}>
                  {filteredProduct?.length > 0 ? (
                     filteredProduct?.map((product) => (
                        <Flex
                           p={"0 30px"}
                           justifyContent={"space-between"}
                           key={product.id}>
                           <Text>{product.name}</Text>
                           <Text>
                              <IconButton
                                 onClick={() => {
                                    restoreproduct(product.id);
                                    getproduct();
                                 }}
                                 size="md"
                                 icon={<LiaTrashRestoreSolid />}
                                 bg={"green.200"}
                                 _hover={{ bg: "green.400" }}
                              />
                              Restore
                           </Text>
                        </Flex>
                     ))
                  ) : (
                     <Text>Empty item</Text>
                  )}
               </Stack>
            </TabPanel>
         </TabPanels>
      </Tabs>
   );
};
