/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Stack, Text } from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#FFB6C1"];
const RADIAN = Math.PI / 180;

export const PieCharts = ({ totalSold }) => {
   const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
   }) => {
      const radius = outerRadius - 30;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
         <text
            x={x}
            y={y}
            fill="#fff"
            textAnchor="middle"
            dominantBaseline="middle">
            {`\n${(percent * 100).toFixed(0)}%`}
         </text>
      );
   };

   return (
      <Stack direction="column" align="center" spacing={4} mt={4} mb={8}>
         <ResponsiveContainer width="100%" height={200}>
            <PieChart>
               <Pie
                  data={totalSold}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  isAnimationActive={true}>
                  {totalSold?.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
               </Pie>
            </PieChart>
         </ResponsiveContainer>
         <Stack direction="row" spacing={2} justifyContent="center">
            {totalSold?.map((entry, index) => (
               <Stack key={`legend-${index}`} direction="row" align="center">
                  <Box w={4} h={4} bg={COLORS[index]} borderRadius="full" />
                  <Text>{entry.name}</Text>
               </Stack>
            ))}
         </Stack>
      </Stack>
   );
};
