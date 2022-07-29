import styled from "styled-components";
import { TextDiv, ImgContainer } from "./components/styled_tags";
import { useState } from "react";
import LivePointGraph from "./components/live_point_chart";
import { UserInput } from "./components/user_inputs";

const TitleText = styled.a`
  font-size: 150%;
  color: #f652a0;
`;

const ZeroPadding = (paramNum) => {
  if (paramNum > 9) {
    return paramNum.toString();
  } else {
    return "0" + paramNum.toString();
  }
};

const LivePointResult = ({ year, month, timeObj, endTime, startTime, nowTime }) => {
  const livePointMillsecond = 8000 / (endTime - startTime);
  const livePointDue = livePointMillsecond * (nowTime - startTime);
  const livePointHour = livePointMillsecond * (60 * 60 * 1000);
  const livePointDay = livePointHour * 24;

  const zeroPadHours = ZeroPadding(timeObj.getHours());
  const zeroPadMinutes = ZeroPadding(timeObj.getMinutes());
  const zeroPadSeconds = ZeroPadding(timeObj.getSeconds());

  const TimeDiv = () => {
    const timeStr = "YYYY/MM/DD HH:MM:SS"
      .replace("YYYY", year)
      .replace("MM", month + 1)
      .replace("DD", timeObj.getDate())
      .replace("HH", zeroPadHours)
      .replace("MM", zeroPadMinutes)
      .replace("SS", zeroPadSeconds);

    return (
      <TextDiv>
        {"現在時刻は "}
        <a style={{ fontWeight: "bold" }}>{timeStr}</a>
        {" です。"}
      </TextDiv>
    );
  };

  const LivePointDue = () => {
    return (
      <TextDiv>
        {"現在のライブポイントの予想は "}
        <a style={{ fontWeight: "bold" }}>{livePointDue.toFixed(1)}</a>
        {" です。"}
      </TextDiv>
    );
  };

  const LivePointDueUnit = () => {
    return (
      <TextDiv>
        {"一日あたり "}
        <a style={{ fontWeight: "bold" }}>{livePointDay.toFixed(1)}</a>
        {"、一時間あたり "}
        <a style={{ fontWeight: "bold" }}>{livePointHour.toFixed(1)}</a>
        {" 増えていきます。"}
      </TextDiv>
    );
  };

  return (
    <div align="left">
      <TextDiv>
        <TitleText>ライブポイントを8000稼ぐまで</TitleText>
      </TextDiv>
      <TimeDiv />
      <LivePointDue />
      <LivePointDueUnit />
    </div>
  );
};

export default function LivePoint() {
  const [timeObj, setTimeObj] = useState(new Date());
  const [newLivePoint, setNewLivePoint] = useState("");
  const [recordReset, setRecordResetRaw] = useState(false);
  const [newGoalPoint, setNewGoalPoint] = useState("");
  const setRecordReset = () => {
    setRecordResetRaw(!recordReset);
    setNewLivePoint("");
  };

  setInterval(() => {
    // setTimeObj(new Date());
    setTimeObj(new Date());
  }, 1000);

  const year = timeObj.getFullYear();
  const month = timeObj.getMonth();
  const day = timeObj.getDate();

  const endTime = new Date(year, month + 1, 1).getTime() - 1000;
  const startTime = new Date(year, month, 1).getTime();
  const nowTime = timeObj.getTime();

  return (
    <div>
      <LivePointResult
        year={year}
        month={month}
        timeObj={timeObj}
        endTime={endTime}
        startTime={startTime}
        nowTime={nowTime}
      />
      <UserInput
        setNewLivePoint={setNewLivePoint}
        setRecordReset={setRecordReset}
        setNewGoalPoint={setNewGoalPoint}
      />
      <div style={{ marginTop: "30px" }}>
        <LivePointGraph
          timeObj={timeObj}
          newLivePoint={newLivePoint}
          recordReset={recordReset}
          newGoalPoint={newGoalPoint}
        />
      </div>
    </div>
  );
}
