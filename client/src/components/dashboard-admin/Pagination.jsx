/* eslint-disable react/prop-types */
import ReactPaginate from "react-paginate";
import { Text, Flex } from "@chakra-ui/react";
import "./Pagination.css"; 

export const Pagination = ({ totalSold, itemsPerPage, handlePageClick }) => {
   return (
      <Flex justifyContent="center" mt={0}>
         <ReactPaginate
            previousLabel={<Text>Previous</Text>}
            nextLabel={<Text>Next</Text>}
            breakLabel={<Text>...</Text>}
            pageCount={Math.ceil(totalSold?.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageLinkClassName={"page-link"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
         />
      </Flex>
   );
};
