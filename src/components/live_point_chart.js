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
  return point => point == goalPoint ? point.toFixed(0) : point.toFixed(1);
}

export default function LivePointGraph({ year, month, day, startTime, endTime, nowTime }) {
  // nowTime = endTime - 360000000;

  const livePointMillsecond = goalPoint / (endTime - startTime);
  const livePointDue = livePointMillsecond * (nowTime - startTime);
  const data5StartTimeRaw = new Date(year, month, day - 3).getTime();
  const data5StartTime = data5StartTimeRaw > startTime ? data5StartTimeRaw : startTime;
  const data5StartDue = livePointMillsecond * (data5StartTime - startTime);
  const data5EndTimeRaw = new Date(year, month, day + 4).getTime();
  const data5EndTime = data5EndTimeRaw < endTime ? data5EndTimeRaw : endTime;
  const data5EndDue = livePointMillsecond * (data5EndTime - startTime);
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
      theory: data5StartDue,
      time: data5StartTime
    },
    {
      theory: data5EndDue,
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
        data={data5}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time"
          type="number"
          domain={[data5StartTimeRaw, data5EndTimeRaw]}
          tickFormatter={TimeToString(data5StartTime, data5EndTime)}
          ticks={data5.map(e => e.time)}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="theory" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ChartDiv>

  );

}
