import { Stack, Button } from "@chakra-ui/react";
import axios from "axios";
import { TablesCashier } from "./TablesCashier";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";


export const ListCashier = () => {
  const [cashiers, setCashiers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCashiers = async () => {
      try {
        const response = await axios.get("http://localhost:2000/cashier");
        if (Array.isArray(response.data.cashier)) {
          setCashiers(response.data.cashier);
        } else {
          console.error("Data from API is not an array:", response.data.cashier);
        }
      } catch (error) {
        console.error("Error fetching cashiers:", error);
      }
    };

    fetchCashiers();
  }, []);

  const handleAddCashier = () => {
    console.log("Add Cashier button clicked");
    navigate("/registerCashier");
  };

  return (
    <Stack
      bg={"white"}
      h={"100vh"}
      rounded={"20px"}
      p={"50px 3%"}
      m={"0 30px 0 0"}
    >
     
      <Button onClick={handleAddCashier}   bg={"orange"} _hover={{ bg: "orange.300" }} w={"13%"}>
        Add Cashier
      </Button>
    
      <TablesCashier cashiers={cashiers} />
    </Stack>
  );
};
