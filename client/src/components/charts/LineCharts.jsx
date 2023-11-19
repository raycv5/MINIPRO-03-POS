/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Text, Heading, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import TimeFilter from "./TimeFilter";
import { curveCardinal } from "d3-shape";
import {
   AreaChart,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
   Area,
} from "recharts";

export const Linechart = ({ totalPrice }) => {
   const [filteredData, setFilteredData] = useState([]);
   const [dateFilter, setDateFilter] = useState("");

   useEffect(() => {
      filterDataByDate();
   }, [dateFilter, totalPrice]);

   const filterDataByDate = () => {
      if (dateFilter === "") {
         setFilteredData(totalPrice);
      } else {
         const currentDate = new Date();
         const startDate = new Date();

         switch (dateFilter) {
            case "1h":
               startDate.setMinutes(currentDate.getMinutes() - 60);
               break;
            case "3h":
               startDate.setMinutes(currentDate.getMinutes() - 180);
               break;
            case "24h":
               startDate.setHours(currentDate.getHours() - 24);
               break;
            case "7d":
               startDate.setDate(currentDate.getDate() - 7);
               break;
            case "30d":
               startDate.setDate(currentDate.getDate() - 30);
               break;
            default:
               break;
         }

         const filtered = totalPrice.filter((data) => {
            const createdAtDate = new Date(data.createdAt);
            return createdAtDate >= startDate;
         });

         setFilteredData(filtered);
      }
   };

   const handleDateChange = (selectedDate) => {
      setDateFilter(selectedDate);
   };
   const cardinal = curveCardinal.tension(1);

   return (
      <Flex
         style={{ width: "70%", height: "100%" }}
         flexDir={"column"}
         bg={"white"}
         rounded={"20px"}
         p={"10px"}
         gap={"20px"}>
         <Flex justifyContent={"space-between"} alignItems="center">
            <Text fontWeight={"bold"} fontSize={"20px"} m={"0 30px"}>
               Daily Sales
            </Text>
            <TimeFilter handleFilter={handleDateChange} />
         </Flex>
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart
               width={500}
               height={300}
               data={filteredData}
               margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
               }}
               isAnimationActive={true}>
               <CartesianGrid strokeDasharray="1 1" />
               <XAxis
                  dataKey="createdAt"
                  tickFormatter={(value, index) => {
                     const createdAtDate = new Date(value);
                     return `${createdAtDate.getHours()}:${createdAtDate.getMinutes()}`;
                  }}
               />
               <YAxis />
               <Tooltip />
               <Legend />
               <Area
                  type={cardinal}
                  dataKey="total_price"
                  stroke="orange"
                  fill="rgba(255, 183, 51, 0.8)"
               />
            </AreaChart>
         </ResponsiveContainer>
      </Flex>
   );
};
