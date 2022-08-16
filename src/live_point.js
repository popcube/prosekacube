import styled from "styled-components";
import { TextDiv, TitleText } from "./components/styled_tags";
import { useEffect, useState } from "react";
import LivePointGraph, { JSTOffset } from "./components/live_point_chart";
import { UserInput } from "./components/user_inputs";
import { useCookies } from "react-cookie";

const CalcTitleSpan = styled.span`
  display: inline-block;
  font-weight: bold;
  color: #f652a0;
  margin: 0px 7px;
`;

const CalcSpan = styled.span`
  display: inline-block;
  font-weight: bold;
  color: #4c5270;
  margin: 0px 5px;
`;

const ZeroPadding = (paramNum) => {
  if (paramNum > 9) {
    return paramNum.toString();
  } else {
    return "0" + paramNum.toString();
  }
};

const LivePointResult = ({ year, month, timeObj, endTime, startTime, nowTime, newGoalPoint }) => {
  const livePointMillsecond = newGoalPoint / (endTime - startTime);
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
        {"日本時間は "}
        <CalcSpan>{timeStr}</CalcSpan>
        {" です。"}
      </TextDiv>
    );
  };

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
    <div align="left">
      <TextDiv>
        <TitleText>
          {"ライブポイントを"}
          <CalcTitleSpan>{newGoalPoint}</CalcTitleSpan>
          {"稼ぐまで"}
        </TitleText>
      </TextDiv>
      <TimeDiv />
      <LivePointDue />
      <LivePointDueUnit />
    </div>
  );
};

export default function LivePoint() {
  const [timeObj, setTimeObj] = useState(new Date(Date.now() + JSTOffset));
  const [newLivePoint, setNewLivePoint] = useState("");
  const [recordDelete, setRecordDelete] = useState(false);
  const [newCookie, setNewCookie] = useState(false);
  const [newGoalPoint, setNewGoalPoint] = useState(8000);
  const [cookies, ,] = useCookies();
  useEffect(() => {
    if (cookies["goalPoint"] != null) {
      setNewGoalPoint(cookies["goalPoint"]);
    }
  }, []);

  const year = timeObj.getFullYear();
  const month = timeObj.getMonth();
  const day = timeObj.getDate();

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
        year={year}
        month={month}
        timeObj={timeObj}
        endTime={endTime}
        startTime={startTime}
        nowTime={nowTime}
        newGoalPoint={Number(newGoalPoint)}
      />
      <UserInput
        setNewLivePoint={setNewLivePoint}
        setRecordDelete={setRecordDelete}
        setNewGoalPoint={setNewGoalPoint}
        setNewCookie={setNewCookie}
      />
      <div style={{ marginTop: "30px" }}>
        <LivePointGraph
          timeObj={timeObj}
          newLivePoint={newLivePoint}
          recordDelete={recordDelete}
          setRecordDelete={setRecordDelete}
          newCookie={newCookie}
          newGoalPoint={Number(newGoalPoint)}
        />
      </div>
    </div>
  );
}
