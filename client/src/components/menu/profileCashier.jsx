import { FaUserCircle } from 'react-icons/fa';
import { Box, Text, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const CashierProfile = () => {
  const tokenCashier = localStorage.getItem('tokenCashier');
  const [cashierData, setCashierData] = useState(null);

  const fetchData = async () => {
    try {
      if (!tokenCashier) {
        throw new Error('Token Cashier tidak ditemukan.');
      }

      const response = await axios.get('http://localhost:2000/cashier/keep-login', {
        headers: {
          Authorization: `Bearer ${tokenCashier}`,
        },
      });

      setCashierData(response.data);
    } catch (err) {
      console.error('Error fetching cashier data:', err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tokenCashier]);

return (
    <Box
      fontFamily="Montserrat, sans-serif"
      userSelect="none"
      margin="100px auto"
      background="#ffffff"
      color="orange.400"
      borderRadius="5px"
      width="400px"
      textAlign="center"
      boxShadow="0 10px 20px -10px rgba(0,0,0,.75)"
    >
      <Box margin="0 auto" textAlign="center">
        <FaUserCircle
          size="150px"
          fontSize="2xl"
          cursor="pointer"
          color='gray'
          style={{ margin: 'auto' }}
        />
      </Box>
      <Text fontSize="25px" fontWeight="bold" margin="27px 0 0 0">
        Cashier
      </Text>
      <Text color="grey">
        <strong>{cashierData?.fullname}</strong>
      </Text>
      <Text color="grey">
        <strong>{cashierData?.email}</strong>
      </Text>
      <Button
        className="button msg-btn"
        background="orange.400"
        border="1px solid orange.400"
        padding="10px 25px"
        color="#ffffff"
        borderRadius="3px"
        cursor="pointer"
        margin="10px 0 40px 0"
      >
        Reset Password
      </Button>
    </Box>
  );
  
};


