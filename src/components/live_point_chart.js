import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
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

export default function LivePointGraph({ timeObj }) {
  const goalPoint = Number(useSelector(state => state.livePointTracer.goalPoint));

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

  /* eslint-disable no-unused-vars, react/no-unknown-property*/
  const CustomYAxisTick = ({
    tickFormatter,
    verticalAnchor,
    visibleTicksCount,
    x,
    y,
    ...props
  }) => {
    return <text y={y + 4} x={x - 5} {...props} style={{
      whiteSpace: "nowrap",
      fontSize: "80%",
      fontWeight: "bold",
      fill: "#4c5270",
    }}>
      {props.payload.value.toFixed(0)} pt
    </text>
  }
  /* eslint-enable */

  /* eslint-disable no-unused-vars, react/no-unknown-property */
  const CustomXAxisTick = ({
    tickFormatter,
    verticalAnchor,
    visibleTicksCount,
    labelformatter,
    x,
    y,
    ...props
  }) => {
    return <text y={y + 15} x={x} {...props} style={{
      whiteSpace: "nowrap",
      fontSize: "80%",
      fontWeight: "bold",
      fill: "#4c5270",
    }}>
      {labelformatter(props.payload.value)}
    </text>
  }
  /* eslint-enable */

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
          tick={<CustomXAxisTick labelformatter={TimeToString(true)} />}
          ticks={[startTime, endTime]}
          stroke="black"
          dataKey="time"
          type="number"
          domain={[startTime, endTime]}
        />
        <YAxis
          interval={0}
          ticks={[0, goalPoint]}
          tick={<CustomYAxisTick />}
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
          ticks={data5Init.map((e) => e.time)}
          tick={<CustomXAxisTick labelformatter={TimeToString(endTime)} />}
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
          ticks={data5Init.map(e => e.theory)}
          tick={<CustomYAxisTick />}
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
