import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceDot,
  Label,
} from "recharts";
import styled from "styled-components";
import { useSelector } from "react-redux";

const dayMs = 24 * 60 * 60 * 1000;
const localTimeOffset = new Date().getTimezoneOffset() * 60 * 1000;
export const JSTOffset = localTimeOffset + 9 * 60 * 60 * 1000;

const ChartDiv = styled.div`
  padding: 24px 0px;
`;

// ToBeDeleted
export function CookieExpiration(year, month) {
  const endTimeJST = new Date(year, month + 1, 1).getTime();
  // console.log(new Date(endTimeJST - JSTOffset));
  // console.log(JSTOffset / 60 / 60 / 1000);
  return new Date(endTimeJST - JSTOffset);
}

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

export default function LivePointGraph({
  timeObj,
}) {

  const [goalPoint, setGoalPoint] = useState(8000);
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
  const dataInit = [{
    theory: 0,
    time: startTime,
  },
  {
    theory: goalPoint,
    time: endTime,
  }];
  const nowDataObj = {
    theory: livePointDue,
    time: nowTime,
  };
  const [nowData, setNowData] = useState(nowDataObj);
  useEffect(() => setNowData(nowDataObj), [nowDataObj.theory]);

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

  // useEffect(() => {
  //   if (newLivePoint != "") {
  //     let newNowTime = new Date().getTime() + JSTOffset;
  //     let newData = [
  //       ...data,
  //       {
  //         record: newLivePoint,
  //         time: newNowTime,
  //       },
  //     ].sort((a, b) => {
  //       return a.time - b.time;
  //     });
  //     setData(newData);
  //     if (newCookie) {
  //       // setCookie("data", newData, { path: '/prosekacube', expires: cookieExpirationObj });
  //       localStorage.setItem("data", JSON.stringify(newData));
  //     }
  //   }
  // }, [newLivePoint]);
  // console.log(goalPoint);
  // console.log(data);

  return (
    <ChartDiv>
      <AreaChart
        width={500}
        height={300}
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
        <Area
          isAnimationActive={true}
          type="linear"
          data={dataInit}
          dataKey="theory"
          stroke="#f652a0"
          fill="none"
        />
        <Area
          isAnimationActive={true}
          type="linear"
          data={useSelector(state => state.livePointTracer.data)}
          dataKey="record"
          stroke="#4C5270"
          fill="#36eee0"
          fillOpacity={0.3}
        />
        <ReferenceDot x={nowData.time} y={nowData.theory} r={3} fill="#f652a0" stroke="none">
          <Label
            id={0}
            value={`${((livePointDue / goalPoint) * 100).toFixed(1)} %`}
            offset={10}
            position="insideBottomRight"
            style={{ fontSize: "80%", fill: "#f652a0" }}
          />
        </ReferenceDot>
      </AreaChart>
      <AreaChart
        width={500}
        height={300}
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
          allowDataOverflow={true}
          tickFormatter={TimeToString(endTime)}
          ticks={data5Init.map((e) => e.time)}
        />
        <YAxis
          interval={0}
          stroke="black"
          dataKey="theory"
          type="number"
          domain={[
            data5Init[0].theory -
            (data5Init[data5Init.length - 1].theory - data5Init[0].theory) * 0.15,
            data5Init[data5Init.length - 1].theory +
            (data5Init[data5Init.length - 1].theory - data5Init[0].theory) * 0.15,
          ]}
          allowDataOverflow={true}
          tickFormatter={(e) => `${e.toFixed(0)} pt`}
          ticks={data5Init.map((e) => e.theory)}
        />
        <Legend />
        <Area
          isAnimationActive={true}
          type="linear"
          data={data5Init}
          dataKey="theory"
          stroke="#f652a0"
          fill="none"
        />
        <Area
          isAnimationActive={false}
          type="linear"
          data={useSelector(state => state.livePointTracer.data)}
          dataKey="record"
          stroke="#4C5270"
          fill="#36eee0"
          fillOpacity={0.3}
          dot={{ r: 2, fill: "#36eee0", fillOpacity: 1.0 }}
        />
        <ReferenceDot x={nowData.time} y={nowData.theory} r={3} fill="#f652a0" stroke="none" />
      </AreaChart>
    </ChartDiv>
  );
}
