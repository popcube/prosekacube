import styled from "styled-components";
import { TextDiv, TitleText, CalcSpan } from "./components/styled_tags";
import { useEffect, useState } from "react";
import LivePointGraph, { JSTOffset } from "./components/live_point_chart";
import { UserInput } from "./components/user_inputs";
import { useSelector } from "react-redux";

const CalcTitleSpan = styled.span`
  display: inline-block;
  font-weight: bold;
  color: #f652a0;
  margin: 0px 7px;
`;

const ZeroPadding = (paramNum) => {
  if (paramNum > 9) {
    return paramNum.toString();
  } else {
    return "0" + paramNum.toString();
  }
};

export const TimeSpan = ({ timeObj }) => {

  const zeroPadHours = ZeroPadding(timeObj.getHours());
  const zeroPadMinutes = ZeroPadding(timeObj.getMinutes());
  const zeroPadSeconds = ZeroPadding(timeObj.getSeconds());

  const timeStr = "YYYY/MM/DD HH:MM:SS"
    .replace("YYYY", timeObj.getFullYear())
    .replace("MM", timeObj.getMonth() + 1)
    .replace("DD", timeObj.getDate())
    .replace("HH", zeroPadHours)
    .replace("MM", zeroPadMinutes)
    .replace("SS", zeroPadSeconds);

  return (
    <CalcSpan>{timeStr}</CalcSpan>
  );
};

const LivePointResult = ({ timeObj, endTime, startTime, nowTime }) => {
  const goalPoint = useSelector(state => state.livePointTracer.goalPoint);

  const livePointMillsecond = goalPoint / (endTime - startTime);
  const livePointDue = livePointMillsecond * (nowTime - startTime);
  const livePointHour = livePointMillsecond * (60 * 60 * 1000);
  const livePointDay = livePointHour * 24;

  const LivePointDue = () => {
    return (
      <TextDiv>
        {"現在のライブポイントの予想は "}
        <CalcSpan>{livePointDue.toFixed(1)}</CalcSpan>
        {" です。"}
      </TextDiv>
    );
  };

  const LivePointDueUnit = () => {
    return (
      <TextDiv>
        {"一日あたり "}
        <CalcSpan>{livePointDay.toFixed(1)}</CalcSpan>
        {"、一時間あたり "}
        <CalcSpan>{livePointHour.toFixed(1)}</CalcSpan>
        {" 増えていきます。"}
      </TextDiv>
    );
  };

  return (
    <div>
      <TextDiv>
        <TitleText>
          {"ライブポイントを"}
          <CalcTitleSpan>{goalPoint}</CalcTitleSpan>
          {"稼ぐまで"}
        </TitleText>
      </TextDiv>
      <TextDiv>
        {"日本時間は "}
        <TimeSpan timeObj={timeObj} />
        {" です。"}
      </TextDiv>
      <LivePointDue />
      <LivePointDueUnit />
    </div>
  );
};

export default function LivePoint() {
  const [timeObj, setTimeObj] = useState(new Date(Date.now() + JSTOffset));

  const year = timeObj.getFullYear();
  const month = timeObj.getMonth();

  const endTime = new Date(year, month + 1, 1).getTime() - 1000;
  const startTime = new Date(year, month, 1).getTime();
  const nowTime = timeObj.getTime();


  useEffect(() => {
    setTimeout(() => {
      setTimeObj(new Date(Date.now() + JSTOffset));

      // tracking line chart debugging on Date
      // setTimeObj(new Date(endTime));
      // setTimeObj(new Date(startTime));
    }, 100);
  }, [timeObj]);


  return (
    <div>
      <LivePointResult
        timeObj={timeObj}
        endTime={endTime}
        startTime={startTime}
        nowTime={nowTime}
      />
      <UserInput />
      <div style={{ marginTop: "30px" }}>
        <LivePointGraph
          timeObj={timeObj}
        />
      </div>
    </div>
  );
}
