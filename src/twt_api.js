// import React from 'react';
import Plot from 'react-plotly.js';


const xArr = [...Array(1000)].map((_, i) => i)
const yArr = [...Array(1000)].map((_, i) => i * i)
console.log(xArr)
console.log(yArr)

export default function main() {
  return (
    <Plot
      data={[
        {
          x: xArr,
          y: yArr,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
      ]}
      layout={{ width: 1000, height: 800, title: 'A Fancy Plot' }}
    />
  );
}
