/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BiSolidTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
          <Box
            overflowY="auto"
            height="60vh"
            sx={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "10px",
                bg: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10px",
                bg: "#bfbfbf",
              },
            }}
          >
            {cart?.items?.map((item) => {
              return (
                <Flex
                  key={item.id}
                  justifyContent="space-between"
                  bgColor="blackAlpha.200"
                  border="1px"
                  borderColor="white"
                  padding="2%"
                  rounded="xl"
                  marginTop="10px"
                  _hover={{
                    bgColor: "orange.100",
                    borderColor: "orange",
                  }}
                >
                  <Stack direction="row">
                    <Image
                      src={`http://localhost:2000/${item.Product.image}`}
                      boxSize="80px"
                      objectFit="cover"
                      rounded="xl"
                    />
                    <Flex flexDirection="column">
                      <Text fontWeight="bold">{item.Product.name}</Text>
                      <Text fontWeight="semibold">
                        {item?.Product?.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </Text>
                      <Text>
                        x{" "}
                        <Text as={"span"} fontWeight={"bold"}>
                          {item.quantity}
                        </Text>
                      </Text>
                    </Flex>
                  </Stack>
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    alignItems="end"
                  >
                    <Stack direction="row" alignItems="center">
                      {/* ----- DECREMENT ----- */}
                      <Text
                        _hover={{ color: "orange" }}
                        cursor="pointer"
                        onClick={() => handleDecrement(item.id)}
                      >
                        <AiFillMinusCircle size="20" />
                      </Text>
                      <Text>{item.quantity}</Text>
                      {/* ----- INCREMENT ----- */}
                      <Text
                        _hover={{ color: "orange" }}
                        cursor="pointer"
                        onClick={() => handleIncrement(item.id)}
                      >
                        <AiFillPlusCircle size="20" />
                      </Text>
                    </Stack>
                    {/* ----- DELETE ----- */}
                    <Text
                      cursor="pointer"
                      _hover={{ color: "red.600" }}
                      onClick={() => handleDelete(item.id)}
                    >
                      <BiSolidTrashAlt size="20" />
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Flex
          area={"bottom"}
          bgColor="blackAlpha.200"
          rounded="xl"
          height="100%"
          padding="5%"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <Flex justifyContent="space-between">
              <Text>
                Items (
                <Text as={"span"} fontWeight="semibold">
                  {cart?.items?.length}
                </Text>
                )
              </Text>
              <Text fontWeight="semibold">
                {cart?.total_price?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Discount</Text>
              <Text fontWeight="semibold">0</Text>
            </Flex>
            <Flex
              fontWeight="bold"
              justifyContent="space-between"
              borderY="1px"
              paddingY="6px"
              marginY="6px"
            >
              <Text>Total</Text>
              <Text>
                {cart?.total_price?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </Text>
            </Flex>
          </Box>
          <Box>
            <Text fontWeight="bold">Payment Method</Text>
            <RadioGroup onChange={handlePayment}>
              <Flex justifyContent="space-between" padding="2%">
                <Radio value="1">Cash</Radio>
                <Radio value="2">Debit</Radio>
                <Radio value="3">QRIS</Radio>
              </Flex>
            </RadioGroup>
          </Box>
          <Box textAlign="center">
            <Button
              width="100%"
              bgColor="orange"
              _hover={{ bgColor: "orange.200" }}
              onClick={handleSubmit}
            >
              Checkout
            </Button>
          </Box>
        </Flex>
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
