/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Select, Text } from "@chakra-ui/react";

const TimeFilter = ({ handleFilter }) => {
   const [selectedTime, setSelectedTime] = useState("");

   const timeOptions = [
      { label: "All Time", value: "" },
      { label: "Last 24 Hours", value: "24h" },
      { label: "Last 7 Days", value: "7d" },
      { label: "Last 30 Days", value: "30d" },
   ];

   const handleChange = (event) => {
      const value = event.target.value;
      setSelectedTime(value);
      handleFilter(value);
   };

   return (
      <Box>
         <Text>Sort by :</Text>
         <Select value={selectedTime} onChange={handleChange}>
            {timeOptions.map((option) => (
               <option key={option.value} value={option.value}>
                  {option.label}
               </option>
            ))}
         </Select>
      </Box>
   );
};

export default TimeFilter;
