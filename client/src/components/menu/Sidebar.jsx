import { Flex, Stack, Text, VStack } from "@chakra-ui/react";
import { GoHome } from "react-icons/go";
import { AiOutlineHistory } from "react-icons/ai";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const sidebarItems = [
  { text: "Home", icons: <GoHome size="25" /> },
  { text: "History", icons: <AiOutlineHistory size="25" /> },
  { text: "Settings", icons: <FiSettings size="25" /> },
];

function Sidebar() {
  return (
    <Flex
      height="100vh"
      flexDirection="column"
      justifyContent="space-between"
      padding="10px 20px"
      borderRight="1px"
      borderColor="gray.200"
    >
      <Stack textAlign="center" gap="50">
        <Text
          fontWeight="bold"
          fontSize="2xl"
          letterSpacing="tighter"
          color="orange"
        >
          كا
          <Text as={"span"} color="black">
            شير
          </Text>
        </Text>
        <Flex flexDirection="column" gap="30" alignItems="center">
          {sidebarItems.map((item, idx) => {
            return (
              <Flex
                key={idx}
                alignItems="center"
                cursor="pointer"
                color="gray.600"
                flexDirection="column"
                paddingY="15%"
                width="100%"
                rounded="xl"
                _hover={{ bgColor: "orange" }}
              >
                <Text>{item.icons}</Text>
                <Text
                  display={{ base: "none", md: "block" }}
                  letterSpacing="tight"
                >
                  {item.text}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Stack>
      <Stack>
        <VStack
          width="100%"
          paddingY="15%"
          alignItems="center"
          color="gray.600"
          rounded="xl"
          _hover={{ bgColor: "orange" }}
        >
          <Text>
            <FaUserCircle size="35" />
          </Text>
          <Text
            display={{ base: "none", md: "block" }}
            letterSpacing="tight"
            fontWeight="bold"
          >
            Agna
          </Text>
        </VStack>
        <VStack
          width="100%"
          paddingY="15%"
          alignItems="center"
          color="gray.600"
          rounded="xl"
          _hover={{ bgColor: "orange" }}
        >
          <Text>
            <FiLogOut size="20" />
          </Text>
          <Text display={{ base: "none", md: "block" }} letterSpacing="tight">
            Logout
          </Text>
        </VStack>
      </Stack>
    </Flex>
  );
}

export default Sidebar;
