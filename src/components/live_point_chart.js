import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceDot,
  Label,
} from "recharts";
import styled from "styled-components";

const goalPoint = 8000;
const dayMs = 24 * 60 * 60 * 1000;

const ChartDiv = styled.div`
  padding: 24px 0px;
`;

const ZeroPadding = (paramNum) => {
  if (paramNum > 9) {
    return paramNum.toString();
  } else {
    return "0" + paramNum.toString();
  }
};

function TimeToString(endTime) {
  return function (time) {
    if (time != endTime) {
      const timeObj = new Date(time);
      const month = timeObj.getMonth();
      const day = timeObj.getDate();
      return `${month + 1}/${day}`;
    } else {
      return "23:59";
    }
  };
}

function CurrentDueHOC(startTime, endTime, targetPoint) {
  return (nowTime) => (targetPoint * (nowTime - startTime)) / (endTime - startTime);
}

const NewReferenceDot = () => {
  return <ReferenceDot />;
};

export default function LivePointGraph({ timeObj, newLivePoint }) {
  // nowTime = startTime;
  // nowTime = endTime;

  const year = timeObj.getFullYear();
  const month = timeObj.getMonth();
  const day = timeObj.getDate();

  const endTime = new Date(year, month + 1, 1).getTime() - 1000;
  const startTime = new Date(year, month, 1).getTime();
  const nowTime = timeObj.getTime();

  const CurrentDue = CurrentDueHOC(startTime, endTime, goalPoint);
  const livePointDue = CurrentDue(nowTime);
  const data5StartTimeRaw = new Date(year, month, day - 3).getTime();
  const data5EndTimeRaw = new Date(year, month, day + 4).getTime();
  const data5Init = [];
  const dataInit = [];

  var i = 0;
  while (data5StartTimeRaw + i * dayMs < startTime) i++;
  while (i < 8 && data5StartTimeRaw + i * dayMs < endTime) {
    data5Init.push({
      theory: CurrentDue(data5StartTimeRaw + i * dayMs),
      time: data5StartTimeRaw + i * dayMs,
    });
    i++;
  }
  if (i < 8 && data5StartTimeRaw + i * dayMs >= endTime) {
    data5Init.push({
      theory: goalPoint,
      time: endTime,
    });
  }
  dataInit.push(
    {
      theory: 0,
      record: 0,
      time: startTime,
    },
    {
      theory: goalPoint,
      record: goalPoint,
      time: endTime,
    }
  );

  const nowDataObj = {
    theory: livePointDue,
    time: nowTime,
  };
  const [nowData, setNowData] = useState(nowDataObj);
  const [keyNum, setKeyNum] = useState(0);
  const [data, setData] = useState(dataInit);
  const [data5, setData5] = useState(data5Init);
  useEffect(() => setNowData(nowDataObj), []);
  useEffect(() => {
    if (newLivePoint != "") {
      let newNowTime = new Date().getTime();
      setData(
        [
          ...data,
          {
            theory: CurrentDue(newNowTime),
            record: newLivePoint,
            time: newNowTime,
          },
        ].sort((a, b) => {
          return a.time - b.time;
        })
      );
      setData5(
        [
          ...data5,
          {
            thoery: CurrentDue(newNowTime),
            record: newLivePoint,
            time: newNowTime,
          },
        ].sort((a, b) => {
          return a.time - b.time;
        })
      );
      setKeyNum(keyNum + 1);
    }
  }, [newLivePoint]);

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
        key={`LineChart_${keyNum}`}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          interval={0}
          tickFormatter={TimeToString(true)}
          ticks={[startTime, endTime]}
          stroke="black"
          dataKey="time"
          type="number"
          domain={[startTime, endTime]}
        />
        <YAxis
          interval={0}
          tickFormatter={(e) => `${e.toFixed(0)} pt`}
          ticks={[0, goalPoint]}
          stroke="black"
          dataKey="theory"
          type="number"
          domain={[0, goalPoint * 1.15]}
        />
        <Legend />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="theory"
          stroke="#8884d8"
          dot={{ r: 3 }}
        />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="record"
          stroke="green"
          dot={{ r: 3 }}
          key={`Line_${keyNum}`}
        />
        <ReferenceDot x={nowData.time} y={nowData.theory} r={3} fill="#8884d8" stroke="none">
          <Label
            id={0}
            value={`${((livePointDue / goalPoint) * 100).toFixed(1)} %`}
            offset={10}
            position="insideBottomRight"
          />
        </ReferenceDot>
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
          interval={0}
          dataKey="time"
          type="number"
          stroke="black"
          domain={[data5StartTimeRaw, data5EndTimeRaw]}
          tickFormatter={TimeToString(endTime)}
          ticks={data5.map((e) => e.time)}
        />
        <YAxis
          interval={0}
          stroke="black"
          dataKey="theory"
          type="number"
          domain={[
            data5[0].theory - (data5[data5.length - 1].theory - data5[0].theory) * 0.15,
            data5[data5.length - 1].theory +
              (data5[data5.length - 1].theory - data5[0].theory) * 0.15,
          ]}
          tickFormatter={(e) => `${e.toFixed(0)} pt`}
          ticks={data5.map((e) => e.theory)}
        />
        <Legend />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="theory"
          stroke="#8884d8"
          dot={{ r: 3 }}
        />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="record"
          stroke="green"
          dot={{ r: 3 }}
          key={`Line_${keyNum}`}
        />
        <ReferenceDot x={nowData.time} y={nowData.theory} r={3} fill="#8884d8" stroke="none" />
      </LineChart>
    </ChartDiv>
  );
}
