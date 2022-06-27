import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: '6/1',
    theory: 0,
    reality: 1000,
  },
  {
    name: '6/30',
    theory: 8000,
    reality: 6500,
  },
];

export default function LivePointGraph() {
  const demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
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
      <Line type="monotone" dataKey="theory" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="reality" stroke="#82ca9d" />
    </LineChart>
  );

}
