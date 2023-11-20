/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import MenuCard from "./MenuCard";

function MainContent({
  product,
  getProducts,
  getCarts,
  setCategory,
  categoryId,
  handlePageChange,
  currentPage,
}) {
  return (
    <Flex flexDirection="column" bgColor="gray.100" height="100%">
      <Navbar
        route={"home"}
        setCategory={setCategory}
        getProducts={getProducts}
        categoryId={categoryId}
      />
      <MenuCard
        product={product}
        getProducts={getProducts}
        getCarts={getCarts}
        categoryId={categoryId}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </Flex>
  );
}

export default MainContent;
