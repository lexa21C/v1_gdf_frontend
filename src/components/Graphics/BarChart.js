import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

const fetchDataFromAPI = async (setData) => {
  try {
    const response = await axios.get('/api/v1/graphsProjectFp');


    if (response.status === 200 && response.data && response.data.results) {
      const apiData = response.data.results;

      const chartData = apiData.map((result) => {
        const name2 = result.programName;
        const name = result.programName.length > 12 ? `${result.programName.slice(0, 12)}...` : result.programName;
        return {
          name2,
          name,
          'Terminado': result.completedCount,
          'En proceso': result.inProcessCount,
        };
      });

      setData(chartData);
    } else {
      
    }
  } catch (error) {
    console.error('Error al obtener los datos de la API:', error);
   
  }
};
const BarChartGraphics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI(setData);
  }, []);
  const getColor = (value) => {
    if (value === 'En proceso') {
      return '#ffce40'; // Color para barras "En proceso"
    } else if (value === 'Terminados') {
      return '#3461AD'; // Color para barras "Terminados"
    }
    // return ('#f5365c', 'ffce40'); // Color predeterminado para otras barras
  };

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value, fill } = props;
    const radius = Math.min(width / 2, 20); // Ajustar el tamaño del círculo en función del ancho de la barra
    const fontSize = Math.min(radius * 0.8, 16); // Ajustar el tamaño de la fuente en función del tamaño del círculo

    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill={fill} stroke={fill} />
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: `${fontSize}px` }} // Aplicar el tamaño de la fuente al número
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="97%" height={355}  marginTop={50}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Terminado" fill="#3461AD" barSize={20}>
          <LabelList
            dataKey="Terminado"
            position="top"
            content={(props) =>
              renderCustomizedLabel({ ...props, fill: getColor(props.value) })
            }
          />
        </Bar>
        <Bar dataKey="En proceso" fill="#ffce40" barSize={20}>
          <LabelList
            dataKey="En proceso"
            position="top"
            content={(props) =>
              renderCustomizedLabel({ ...props, fill: getColor(props.value) })
            }
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartGraphics;
