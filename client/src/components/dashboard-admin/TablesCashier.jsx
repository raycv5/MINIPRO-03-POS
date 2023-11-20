import { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Switch,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

export const TablesCashier = () => {
  const [cashiers, setCashiers] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    const fetchCashiers = async () => {
      try {
        const response = await axios.get("http://localhost:2000/cashier");
        if (Array.isArray(response.data.cashier)) {
          setCashiers(response.data.cashier);
        } else {
          console.error("Data dari API bukan array:", response.data.cashier);
        }
      } catch (error) {
        console.error("Error mengambil data kasir:", error);
      }
    };

    fetchCashiers();
  }, []);

  const handleSwitchChange = async (id, newDisableValue) => {
    try {
      // Update state locally optimistically
      setCashiers((prevCashiers) =>
        prevCashiers.map((cashier) =>
          cashier.id === id ? { ...cashier, disable: newDisableValue } : cashier
        )
      );

      // Send request to update database
      await axios.put(`http://localhost:2000/cashier/disabled/${id}`, {
        disable: newDisableValue,
      });
    } catch (error) {
      console.error("Error updating disable status:", error);
      // Revert to the previous state if an error occurs
      setCashiers((prevCashiers) =>
        prevCashiers.map((cashier) =>
          cashier.id === id ? { ...cashier, disable: !newDisableValue } : cashier
        )
      );
    }
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  const handleDeleteCashier = async () => {
    if (deleteConfirmation) {
      try {
        // Send request to delete cashier
        await axios.delete(`http://localhost:2000/cashier/${deleteConfirmation}`);

        // Remove deleted cashier from the state
        setCashiers((prevCashiers) =>
          prevCashiers.filter((cashier) => cashier.id !== deleteConfirmation)
        );
      } catch (error) {
        console.error("Error deleting cashier:", error);
      } finally {
        // Reset deleteConfirmation state
        setDeleteConfirmation(null);
      }
    }
  };

  const onCloseDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Daftar Kasir</TableCaption>
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>fullname</Th>
            <Th>email</Th>
            <Th>Disable</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cashiers.map((cashier) => (
            <Tr key={cashier.id}>
              <Td>{cashier.id}</Td>
              <Td>{cashier.fullname}</Td>
              <Td>{cashier.email}</Td>
              <Td>
                <Switch
                  size="lg"
                  isChecked={cashier.disable}
                  onChange={() =>
                    handleSwitchChange(cashier.id, !cashier.disable)
                  }
                />
              </Td>
              <Td>
                <FaTrash
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDeleteConfirmation(cashier.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <AlertDialog
        isOpen={!!deleteConfirmation}
        onClose={onCloseDeleteConfirmation}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Hapus Kasir
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah Anda yakin ingin menghapus kasir ini?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onCloseDeleteConfirmation}>Batal</Button>
              <Button colorScheme="red" onClick={handleDeleteCashier} ml={3}>
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </TableContainer>
  );
};


