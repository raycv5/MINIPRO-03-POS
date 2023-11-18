/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
   TableContainer,
   Tbody,
   Thead,
   Td,
   Tr,
   Table,
   TableCaption,
   Th,
   Flex,
   Text,
   Image,
   Box,
   VStack,
   SkeletonCircle,
   SkeletonText,
   Collapse,
   Switch,
   Select,
   Icon,
} from "@chakra-ui/react";
import { Modals } from "./Modals";
import { useEffect, useState } from "react";
import axios from "axios";

export const Tables = ({
   name,
   data,
   headers,
   count,
   handleImage,
   loading,
   handleEdit,
   edited,
   find,
   handleSubmitEdit,
   handleSubmitDeleted,
}) => {
   const [openModalId, setOpenModalId] = useState(null);
   const handleCloseModal = () => {
      setOpenModalId(null);
   };

   const [status, setStatus] = useState({});
   const isDisabled = async (itemId, isDisabled) => {
      try {
         await axios.patch(`http://localhost:2000/product/disabled/${itemId}`, {
            isDisabled,
         });
         find();
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      find();
   }, []);
   return (
      <>
         <Flex
            w={"15%"}
            gap={"20px"}
            alignSelf={"end"}>
            <Text>Sort</Text>
            <Select h={"30px"}></Select>
         </Flex>
         {!loading ? (
            <Collapse in={!loading} transition={{ enter: { duration: 2 } }}>
               <TableContainer m={"0"}>
                  <Table variant="simple" size={"md"}>
                     <TableCaption>
                        Total {headers.first}: {count}
                     </TableCaption>
                     <Thead>
                        <Tr>
                           <Th>{headers.first}</Th>
                           <Th>
                              <Flex gap={"15px"}>
                                 <Text>Edit</Text>
                                 <Text>Delete</Text>
                              </Flex>
                           </Th>
                           {headers.first === "Product" ? (
                              <Th>Status</Th>
                           ) : null}
                        </Tr>
                     </Thead>
                     <Tbody>
                        {data?.length > 0 ? (
                           data.map((item) => (
                              <Tr key={item.id}>
                                 <Td>{item[name]}</Td>
                                 <Td>
                                    <Modals
                                       find={find}
                                       isOpen={openModalId === item.id}
                                       onClose={handleCloseModal}
                                       headers={headers}
                                       index={item.id}
                                       handleEdit={handleEdit}
                                       edited={edited}
                                       handleSubmitEdit={handleSubmitEdit}
                                       handleSubmitDeleted={handleSubmitDeleted}
                                       handleImage={handleImage}
                                    />
                                 </Td>
                                 {headers.first === "Product" ? (
                                    <Td>
                                       <Flex gap={"2%"} alignItems={"center"}>
                                          <Switch
                                             colorScheme="orange"
                                             onClick={find}
                                             id={`switch-${item.id}`}
                                             onChange={() => {
                                                let newStatus =
                                                   !status[item.id];
                                                setStatus((prevStatus) => ({
                                                   ...prevStatus,
                                                   [item.id]:
                                                      !prevStatus[item.id],
                                                }));
                                                isDisabled(item.id, newStatus);
                                             }}
                                             isChecked={!item?.isDisabled}
                                          />
                                          {item.isDisabled ? (
                                             <Flex alignItems={"center"}>
                                                <Icon
                                                   viewBox="0 0 200 200"
                                                   color="red">
                                                   <path
                                                      fill="currentColor"
                                                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                                                   />
                                                </Icon>
                                                <Text>Disabled</Text>
                                             </Flex>
                                          ) : (
                                             <Flex alignItems={"center"}>
                                                <Icon
                                                   viewBox="0 0 200 200"
                                                   color="green.500">
                                                   <path
                                                      fill="currentColor"
                                                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                                                   />
                                                </Icon>
                                                <Text>Actived</Text>
                                             </Flex>
                                          )}
                                       </Flex>
                                    </Td>
                                 ) : null}
                              </Tr>
                           ))
                        ) : (
                           <Tr key="no-data">
                              <Td colSpan="4">
                                 <Image
                                    src="https://www.empoweryouth.com/assets/themes/ey/images/pages/jobs/not_found.png"
                                    w={"100%"}
                                    h={"100%"}
                                 />
                              </Td>
                           </Tr>
                        )}
                     </Tbody>
                  </Table>
               </TableContainer>
            </Collapse>
         ) : (
            <>
               <Box padding="6" boxShadow="lg" bg="white">
                  <SkeletonCircle size="10" isLoaded={loading} />
                  <SkeletonText
                     mt="4"
                     noOfLines={4}
                     spacing="4"
                     skeletonHeight="2"
                  />
               </Box>
            </>
         )}
      </>
   );
};
