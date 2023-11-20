/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartBottom from "./CartBottom";
import CartItem from "./CartItem";

function Cart({ getProducts, getCarts, cart }) {
  const [payment, setPayment] = useState("");
  const [cashAmount, setCashAmount] = useState(0);
  const [transactionId, setTransactionId] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = { PaymentMethodId: payment, CashierId: 1 };
    const transaction = await axios.post(
      "http://localhost:2000/transactions",
      data
    );
    const transactionId = transaction?.data?.data?.id;
    setTransactionId(transactionId);

    if (payment == 1) {
      onOpen();
    } else {
      if (transactionId) {
        navigate(`/transaction/${transactionId}`);
      }
    }
  };

  const handlePayment = (id) => {
    setPayment(id);
  };

  const handleIncrement = async (id) => {
    try {
      await axios.patch(`http://localhost:2000/carts/increment/${id}`);
      getCarts();
      getProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecrement = async (id) => {
    try {
      await axios.patch(`http://localhost:2000/carts/decrement/${id}`);
      getCarts();
      getProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/carts/${id}`);
      getCarts();
      getProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCash = (e) => {
    setCashAmount(e.target.value);
  };

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <Grid
      bgColor="white"
      height="100vh"
      padding="10px 20px"
      templateAreas={"top bottom"}
      gridTemplateRows={"70% 30%"}
      borderLeft="1px"
      borderColor="gray.200"
    >
      <GridItem>
        <Box area={"top"} maxHeight="70%">
          <Text fontWeight="bold" fontSize="2xl" marginBottom="20px">
            Current Order
          </Text>
          <CartItem
            cart={cart}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            handleDelete={handleDelete}
          />
        </Box>
      </GridItem>
      <GridItem>
        <CartBottom
          cart={cart}
          handlePayment={handlePayment}
          handleSubmit={handleSubmit}
        />
      </GridItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap="5">
              <Text fontSize="xl">
                Cash :{" "}
                {cashAmount.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}{" "}
              </Text>
              <Text fontSize="xl">
                Change :{" "}
                {cashAmount - cart?.total_price < 0
                  ? "0"
                  : (cashAmount - cart?.total_price).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}{" "}
              </Text>
              <Input onChange={handleCash} />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                navigate(`/transaction/${transactionId}`);
              }}
            >
              Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
}

export default Cart;
