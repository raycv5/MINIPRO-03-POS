/* eslint-disable react/prop-types */
import {
   Button,
   ModalOverlay,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalFooter,
} from "@chakra-ui/react";

export const DeletedModals = ({ onClose, handleSubmitDeleted, find }) => {
   return (
      <>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Are you sure want to delete?</ModalHeader>
            <ModalCloseButton />
            {/* <ModalBody>Delete modal</ModalBody> */}
            <ModalFooter>
               <Button colorScheme="orange" onClick={onClose}>
                  Cancel
               </Button>
               <Button
                  colorScheme="red"
                  ml={3}
                  onClick={() => {
                     handleSubmitDeleted();
                     onClose();
                     find();
                  }}>
                  Delete
               </Button>
            </ModalFooter>
         </ModalContent>
      </>
   );
};
