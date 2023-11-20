import { Box, Text, Button,  } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!tokenAdmin) {
          throw new Error('Token Admin tidak ditemukan.');
        }

        const response = await axios.get('http://localhost:2000/admin/keep-login', {
          headers: {
            Authorization: `Bearer ${tokenAdmin}`,
          },
        });

        setAdminData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tokenAdmin]); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  

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
      display="flex"
      flexDirection="column"
      alignItems="center" 
    >
      <FaUserCircle size="150px" color='gray' />
      <Text fontSize="25px" fontWeight="bold" margin="27px 0 0 0">
        Admin
      </Text>
      <Text color="grey">
        <strong>{adminData?.fullname}</strong>
      </Text>
      <Text color="grey">
        <strong>{adminData?.email}</strong>
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

export default UserProfile;





