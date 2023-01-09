// import React from 'react';
import Plot from 'react-plotly.js';
import twt_data from './dynamic/twt_data';


const xArr = [...Array(1000)].map((_, i) => i)
const yArr = [...Array(1000)].map((_, i) => i * i)
console.log(xArr)
console.log(yArr)

export default function main() {
  return (
    <Plot
      data={[
        {
          x: twt_data[0].x,
          y: twt_data[0].y,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        }
      ]}
      layout={{ width: 1000, height: 800, title: 'A Fancy Plot' }}
    />
  );
}
