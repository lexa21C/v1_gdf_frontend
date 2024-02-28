import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const AreaChartFillByValue = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('api/v1/graphsProjectCategory');
      setData(response.data);
    } catch (error) {
      console.error(error);
      // console.warn(error)
    }
  };

  return (
    <ResponsiveContainer width="97%" height="100%" >
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 40,
          right: 30,
          left: 30,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="project" stroke="#39a900" fill="#39a900" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartFillByValue;
