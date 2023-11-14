import { Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import MenuCard from "./MenuCard";

function MainContent() {
  return (
    <Flex flexDirection="column" bgColor="blackAlpha.100" height="100%">
      <Navbar />
      <MenuCard />
    </Flex>
  );
}

export default MainContent;
