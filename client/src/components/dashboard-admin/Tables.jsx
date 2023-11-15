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
} from "@chakra-ui/react";
import { EditModals } from "./EditModals";

export const Tables = ({ name, data, headers }) => {
   return (
      <TableContainer>
         <Table variant="simple">
            <TableCaption>Total category</TableCaption>
            <Thead>
               <Tr>
                  <Th>{headers.first}</Th>
                  <Th>{headers.second}</Th>
                  <Th>{headers.third}</Th>
                  <Th>Edit</Th>
               </Tr>
            </Thead>
            {data?.map((item) => (
               <Tbody key={item}>
                  <Tr>
                     <Td>{item[name]}</Td>
                     <Td>millimetres (mm)</Td>
                     <Td>millimetres (mm)</Td>
                     <Td>
                        <EditModals headers={headers} />
                     </Td>
                  </Tr>
               </Tbody>
            ))}
         </Table>
      </TableContainer>
   );
};
