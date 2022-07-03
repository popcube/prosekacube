import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceDot } from 'recharts';
import styled from "styled-components";

const goalPoint = 8000;
const dayMs = 24 * 60 * 60 * 1000;

const ChartDiv = styled.div`
  padding: 24px 0px;
`

function TimeToString(startTime, endTime) {
  return function (time) {
    if (time == startTime || time == endTime) {
      const timeObj = new Date(time);
      const month = timeObj.getMonth();
      const day = timeObj.getDate();
      return `${month + 1}/${day}`;
    }
    else {
      return "now";
    }
  }
}

function YTickFormatter(goalPoint) {
  return function (point) {
    if (point == goalPoint) {
      return point.toFixed(0);
    }
    else {
      return point.toFixed(1);
    }

  }

}

export default function LivePointGraph({ year, month, startTime, endTime, nowTime }) {
  // nowTime = endTime - 360000000;

  const livePointMillsecond = 8000 / (endTime - startTime);
  const livePointDue = livePointMillsecond * (nowTime - startTime);
  const data5StartTime = nowTime - 3 * dayMs > startTime ? nowTime - 3 * dayMs : startTime;
  const data5EndTime = nowTime + 3 * dayMs < endTime ? nowTime + 3 * dayMs : endTime;
  const [data, setData] = useState(
    [{
      theory: 0,
      time: startTime
    },
    {
      theory: goalPoint,
      time: endTime
    },
    {
      theory: livePointDue,
      time: nowTime
    }]
  );
  const [data5, setData5] = useState(
    [{
      theory: 0,
      time: data5StartTime
    },
    {
      theory: goalPoint,
      time: data5EndTime
    },
    {
      theory: livePointDue,
      time: nowTime
    }]
  );

  useEffect(() => {
    data.splice(data.length - 1, 1, {
      theory: livePointDue,
      time: nowTime
    });
    setData(data);
  }, []);

  // console.log(...data);
  const xTicks = data.map(x => x.time);

  const demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';


  return (
    <ChartDiv>
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
        <XAxis
          interval="preserveStart"
          tickFormatter={TimeToString(startTime, endTime)}
          ticks={[data[2].time, data[1].time]}
          stroke="black"
          dataKey="time"
          type="number"
          domain={[startTime, endTime]}
        />
        <YAxis
          interval="preserveStartEnd"
          tickFormatter={YTickFormatter(goalPoint)}
          ticks={[data[2].theory, data[1].theory]}
          stroke="black"
          dataKey="theory"
          type="number"
          domain={[data[0].theory, data[1].theory]}

        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="theory" stroke="#F652A0" activeDot={{ r: 8 }} />
      </LineChart>
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
        <XAxis dataKey="time" type="number" domain={['dataMin', 'dataMax']} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="theory" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ChartDiv>

  );

}
