import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex,
  Link,
  Button,
  useToast
} from "@chakra-ui/react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LoginCashier = () => {
    const navigate = useNavigate();
    const toast = useToast()
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  
  const handleSubmit = async (values) => { 
    try {
      const response = await axios.post('http://localhost:2000/cashier/login', values);
      console.log(response)

      if (!response.data) {
        console.error( response.data);
         toast({
             title: "Error",
             description: `${response.data.message}`,
             status: "error",
             duration: 3000,
             position: "top-left",
             isClosable: true,
          });
      
      } else {
         console.log('Login successful');
        localStorage.setItem("tokenCashier", response.data.token);
        navigate('/home')
        toast({
            title: "succes",
            description: 'Login success',
            status: "success",
            duration: 3000,
            position: "top-left",
            isClosable: true, 
        })
      }
    } catch (error) {
      console.error(error.response.data);
      toast({
        title: "Error",
        description: `${error.response.data?.message}`,
        status: "error",
        duration: 3000,
        position: "top-left",
        isClosable: true,
     });
    } 
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          console.log(values);
          handleSubmit(values);
          action.resetForm();
        }}
      >
        <Form>
          <VStack w={"100%"}>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...field}
                    id="email"
                    variant="flushed"
                    type="text"
                    focusBorderColor="orange.400"
                  />
                  <ErrorMessage name="email" component="div" color="red.500" />
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...field}
                    id="password"
                    variant="flushed"
                    type="password"
                    focusBorderColor="orange.400"
                  />
                  <ErrorMessage name="password" component="div" color="red.500" />
                </FormControl>
              )}
            </Field>
            <Flex
              flexDir={{ base: "column", md: "row", lg: "row" }}
              justifyContent={"space-between"}
              gap={{ base: "0", md: "40px", lg: "50px", xl: "70px" }}
              fontSize={{ base: "12px", md: "14px", lg: "16px" }}
              w={"300px"}
            >
              <Link>Forgot password?</Link>
            </Flex>
            <Button
              colorScheme="orange"
              w={{ base: "50%", sm:"70%", md: "50%", lg: "50%" }}
              type="submit"
            >
              Login 
            </Button>
          </VStack>
        </Form>
      </Formik>
    </>
  );
};


