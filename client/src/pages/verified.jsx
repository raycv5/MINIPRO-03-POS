// import {
//   Box,
//   Stack,
//   Button,
//   Heading,
//   Center,
//   useColorModeValue,
//   useToast,
//   Spinner,
// } from '@chakra-ui/react';
// import axios from 'axios';
// import { useNavigate, useParams, useState } from 'react-router-dom';

// function Verify() {
//   const params = useParams();
//   const toast = useToast();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.patch(
//         `http://localhost:2000/cashier/verified/${params.id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${params.token}`,
//           },
//         }
//       );

//       toast({
//         title: 'Success',
//         description: 'User has been verified',
//         status: 'success',
//         duration: 4000,
//         position: 'center',
//       });

//       navigate('/');
//     } catch (err) {
//       console.error(err);

//       toast({
//         title: 'Error',
//         description: 'Verification failed. Please try again.',
//         status: 'error',
//         duration: 4000,
//         position: 'center',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Center>
//       <Stack
//         spacing={8}
//         mx={'auto'}
//         maxW={'lg'}
//         p={8}
//         rounded={'lg'}
//         bg={useColorModeValue('white', 'gray.700')}
//         boxShadow={'lg'}
//       >
//         <Stack align={'center'}>
//           <Heading fontSize={'4xl'} color={useColorModeValue('teal.500', 'teal.300')}>
//             Account Verification
//           </Heading>
//         </Stack>
//         <Box>
//           <Button colorScheme='teal' size={'lg'} onClick={handleSubmit} disabled={loading}>
//             {loading ? <Spinner /> : 'Verify Account'}
//           </Button>
//         </Box>
//       </Stack>
//     </Center>
//   );
// }

// export default Verify;


   
