/* eslint-disable react/prop-types */
import {
   Modal,
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
   useDisclosure,
   IconButton,
   Select,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";

export const EditModals = ({ headers }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <>
         <IconButton size="sm" icon={<FaRegEdit />} onClick={onOpen} />

         <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Edit {headers.first}</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <FormControl>
                     <FormLabel>{headers.first}</FormLabel>
                     <Input placeholder="First name" />
                  </FormControl>
                  {headers.first == "Category" ? null : headers.first ==
                    "Sub Category" ? (
                     <FormControl mt={4}>
                        <FormLabel>{headers.second}</FormLabel>
                        <Select>
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                        </Select>
                     </FormControl>
                  ) : (
                     <>
                        <FormControl mt={4}>
                           <FormLabel>{headers.third}</FormLabel>
                           <Select>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                           </Select>
                        </FormControl>
                        <FormControl mt={4}>
                           <FormLabel>{headers.second}</FormLabel>
                           <Select>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                           </Select>
                        </FormControl>
                     </>
                  )}
               </ModalBody>

               <ModalFooter>
                  <Button colorScheme="orange" mr={3}>
                     Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};
