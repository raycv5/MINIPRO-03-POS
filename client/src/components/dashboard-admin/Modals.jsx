/* eslint-disable react/prop-types */
import { Modal, useDisclosure, IconButton, HStack } from "@chakra-ui/react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { DeletedModals } from "./DeletedModals";
import { EditedModals } from "./EditedModals";
import { useState } from "react";

export const Modals = ({
   headers,
   index,
   handleEdit,
   edited,
   handleSubmitEdit,
   find,
   handleSubmitDeleted,
   handleImage,
   filterCategory,
   filterSubCategory,
}) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [modalType, setModalType] = useState(null);

   const handleEditClick = () => {
      setModalType("edited");
      onOpen();
      handleEdit(index);
   };

   const handleDeleteClick = () => {
      setModalType("deleted");
      onOpen();
      handleEdit(index);
   };

   const renderModalContent = () => {
      if (modalType === "edited") {
         return (
            <EditedModals
               filterCategory={filterCategory}
               filterSubCategory={filterSubCategory}
               headers={headers}
               onClose={() => {
                  setModalType(null);
                  onClose();
                  find();
               }}
               find={find}
               edited={edited}
               handleSubmitEdit={handleSubmitEdit}
               handleImage={handleImage}
            />
         );
      } else if (modalType === "deleted") {
         return (
            <DeletedModals
               find={find}
               headers={headers}
               onClose={() => {
                  setModalType(null);
                  onClose();
               }}
               handleSubmitDeleted={handleSubmitDeleted}
            />
         );
      }
      return null;
   };

   return (
      <>
         <HStack gap={"20px"}>
            <IconButton
               size="sm"
               icon={<FaRegEdit />}
               onClick={handleEditClick}
               bg={"orange.200"}
               _hover={{ bg: "orange" }}
            />
            <IconButton
               size="sm"
               icon={<FaRegTrashAlt />}
               onClick={handleDeleteClick}
               bg={"red.200"}
               _hover={{ bg: "red.500" }}
            />
         </HStack>

         <Modal isOpen={isOpen} onClose={() => setModalType(null)}>
            {isOpen && renderModalContent()}
         </Modal>
      </>
   );
};
