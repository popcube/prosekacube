import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceDot } from 'recharts';
import styled from "styled-components";

const goalPoint = 8000;
const dayMs = 24 * 60 * 60 * 1000;

const ChartDiv = styled.div`
  padding: 24px 0px;
`

function TimeToString(time) {
  const timeObj = new Date(time);
  const month = timeObj.getMonth();
  const day = timeObj.getDate();
  return `${month + 1}/${day}`;
}

function YTickFormatter(goalPoint) {
  return point => point == goalPoint ? point.toFixed(0) : point.toFixed(1);
}

function CurrentDueHOC(startTime, endTime, targetPoint) {
  return nowTime => targetPoint * (nowTime - startTime) / (endTime - startTime);
}

export default async function LivePointGraph({ year, month, day, startTime, endTime, nowTime }) {
  // nowTime = endTime - 360000000;

  const CurrentDue = CurrentDueHOC(startTime, endTime, goalPoint);
  const livePointDue = CurrentDue(nowTime);
  const data5StartTimeRaw = new Date(year, month, day - 3).getTime();
  const data5EndTimeRaw = new Date(year, month, day + 4).getTime();
  const data5Init = [];
  const dataInit = [];
  useEffect(() => {
    (async () => {
      await new Promise((resolve) => {
        var i = 0;
        while (data5StartTimeRaw + i * dayMs < startTime) i++;
        while (i < 7 && data5StartTimeRaw + i * dayMs < endTime) {
          data5Init.push({
            theory: CurrentDue(data5StartTimeRaw + i * dayMs),
            time: data5StartTimeRaw + i * dayMs
          });
          i++;
        }
        if (i < 7 && data5StartTimeRaw + i * dayMs < endTime) {
          resolve(data5Init);
        }
      });
      await new Promise((resolve) => {
        dataInit.push(
          {
            theory: 0,
            time: startTime
          },
          {
            theory: goalPoint,
            time: endTime
          }
        );
        if (dataInit.length == 2) {
          resolve(dataInit);
        }
      });
    });
  }, []);

  const nowDataObj = {
    theory: livePointDue,
    time: nowTime
  };
  const [nowData, setNowData] = useState(nowDataObj);
  useEffect(() => setNowData(nowDataObj), []);

  const demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';


  return (
    <ChartDiv>
      <LineChart
        width={500}
        height={300}
        data={dataInit}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          interval={0}
          tickFormatter={TimeToString}
          ticks={[startTime, endTime]}
          stroke="black"
          dataKey="time"
          type="number"
          domain={[startTime, endTime]}
        />
        <YAxis
          interval={0}
          tickFormatter={YTickFormatter(goalPoint)}
          ticks={dataInit.map(e => e.theory)}
          stroke="black"
          dataKey="theory"
          type="number"
          domain={dataInit.map(e => e.theory)}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="theory" stroke="#F652A0" dot={{ r: 8 }} />
      </LineChart>
      <LineChart
        width={500}
        height={300}
        data={data5Init}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          interval={0}
          dataKey="time"
          type="number"
          domain={[data5Init[0].time, data5Init[data5Init.length - 1].time]}
          tickFormatter={TimeToString}
          ticks={data5Init.map(e => e.time)}
        />
        <YAxis
          interval={0}
          stroke="black"
          dataKey="theory"
          type="number"
          domain={
            [
              data5Init[0].theory - (data5Init[data5Init.length - 1].theory - data5Init[0].theory) * 0.15,
              data5Init[data5Init.length - 1].theory + (data5Init[data5Init.length - 1].theory - data5Init[0].theory) * 0.15
            ]
          }
          tickFormatter={YTickFormatter(goalPoint)}
          ticks={data5Init.map(e => e.theory)}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="theory" stroke="#8884d8" dot={{ r: 8 }} />
      </LineChart>
    </ChartDiv>

  );

}
