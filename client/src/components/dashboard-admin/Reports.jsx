   /* eslint-disable no-unused-vars */
   import {
      Text,
      HStack,
      Box,
      TableContainer,
      Table,
      Thead,
      Th,
      Td,
      Tr,
      Tbody,
      Flex,
      Heading,
      Stack,
   } from "@chakra-ui/react";
   import axios from "axios";
   import { useEffect, useState } from "react";
   import { Linechart } from "../charts/LineCharts";
   import { PieCharts } from "../charts/PieCharts";
   import { Pagination } from "./Pagination";

   export const Reports = () => {
      const [productName, setProductName] = useState();
      const [totalPrice, setTotalPrice] = useState();
      const [totalIncome, setTotalIncome] = useState();
      const [totalSold, setTotalSold] = useState();
      const itemsPerPage = 3;
      const [currentPage, setCurrentPage] = useState(0);

      const handlePageClick = (data) => {
         setCurrentPage(data.selected);
      };

      const offset = currentPage * itemsPerPage;
      const paginatedItems = totalSold?.slice(offset, offset + itemsPerPage);

      console.log(totalSold);

      const transactions = async () => {
         try {
            const transaction = await axios.get(
               `http://localhost:2000/transactions`
            );
            setTotalPrice(transaction.data.response);
            setTotalIncome(transaction.data.totalIncome);
         } catch (error) {
            console.log(error);
         }
      };

      const transactionProduct = async () => {
         try {
            const transactionProduct = await axios.get(
               `http://localhost:2000/transaction-products`
            );
            console.log(transactionProduct);
         } catch (error) {
            console.log(error);
         }
      };

      const countTransactionProduct = async () => {
         try {
            const transactionProduct = await axios.get(
               `http://localhost:2000/transaction-products/count`
            );
            setTotalSold(transactionProduct.data);
         } catch (error) {
            console.log(error);
         }
      };

      useEffect(() => {
         transactions();
         countTransactionProduct();
         transactionProduct();
      }, []);

      return (
         <Box h={"100vh"} p={"0 25px"}>
            <Flex
               justifyContent={"space-between"}
               w={"100%"}
               gap={"10px"}
               h={"50%"}>
               {productName?.map((product) => (
                  <Text key={product.id}>{product.Product.name}</Text>
               ))}
               <Linechart totalPrice={totalPrice} />
               <HStack
                  rounded={"20px"}
                  textAlign={"center"}
                  w={"30%"}
                  p={"0 5%"}
                  bg={"white"}
                  flexDir={"column"}>
                  <Text fontWeight={"bold"} fontSize={"30px"} m={"0 30px"}>
                     Total Income
                  </Text>
                  <Heading color={"orange"}>
                     {totalIncome?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                     })}
                  </Heading>
                  <PieCharts totalSold={totalSold} />
               </HStack>
            </Flex>
            <Stack m={"10px 0"}>
               <Text color={"orange"} fontSize={"30px"} fontWeight={"bold"}>
                  Trending dishes
               </Text>
               <TableContainer bg={"white"} w={"50%"} rounded={"10px"} p={'20px 0'}>
                  <Table variant="simple" size={"lg"}>
                     <Thead>
                        <Tr>
                           <Th>Item</Th>
                           <Th isNumeric>Sold</Th>
                        </Tr>
                     </Thead>
                     <Tbody>
                        {paginatedItems?.map((item) => (
                           <Tr key={item.id}>
                              <Td>{item.name}</Td>
                              <Td isNumeric>{item.count}x</Td>
                           </Tr>
                        ))}
                     </Tbody>
                  </Table>
                  <Pagination
                     totalSold={totalSold}
                     itemsPerPage={itemsPerPage}
                     handlePageClick={handlePageClick}
                  />
               </TableContainer>
            </Stack>
         </Box>
      );
   };
