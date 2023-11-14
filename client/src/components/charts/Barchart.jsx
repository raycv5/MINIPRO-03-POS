import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
} from "recharts";
export const Linechart = () => {
   const data = [
      { name: "G1", transaction: 100 },
      { name: "G2", transaction: 200 },
      { name: "G3", transaction: 300 },
      { name: "G4", transaction: 800 },
   ];

   return (
      <div style={{ width: "500px", height: "300px" }}>
         <ResponsiveContainer width="100%" height="100%">
            <LineChart
               width={500}
               height={300}
               data={data}
               margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
               }}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip />
               <Legend />
               {/* <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
         /> */}
               <Line type="monotone" dataKey="transaction" stroke="#82ca9d" />
            </LineChart>
         </ResponsiveContainer>
      </div>
   );
};
