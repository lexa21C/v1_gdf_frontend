import React, { PureComponent } from 'react';
import { PieChart, Cell, Pie, Sector, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const COLORS = ['#3461AD', '#385C57', '#ffce40'];

const SimpleBarCharts = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`N° ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`( ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class PieChartGraphics extends PureComponent {
  state = {
    data: [],
    activeIndex: 0,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get('/api/v1/user');
      const responseData = response.data.results;

      if (Array.isArray(responseData)) {
        const profileCounts = {
          Administrador: 0,
          'Instructor Lider': 0,
          Instructor: 0,
        };

        responseData.forEach((user) => {
          const { type_profile } = user;

          if (Array.isArray(type_profile)) {
            type_profile.forEach((profile) => {
              const { type_profile: profileName } = profile;
              profileCounts[profileName] = (profileCounts[profileName] || 0) + 1;
            });
          } else if (type_profile) {
            profileCounts[type_profile] = (profileCounts[type_profile] || 0) + 1;
          }
        });

        const chartData = Object.entries(profileCounts).map(([name, value]) => ({
          name,
          value,
        }));

        this.setState({ data: chartData });
      } else {
        console.log('La respuesta no es un array:', responseData);
      }
    } catch (error) {
      console.log(error);
      console.warn(error)
    }
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { data, activeIndex } = this.state;

    return (
      <ResponsiveContainer width="105%" height="100%" marginLeft='40px'>
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={SimpleBarCharts}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={105}
            // fill="#F5365C"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
            animationBegin={0}
            animationDuration={500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>


        </PieChart>
      </ResponsiveContainer>
    );
  }
}
