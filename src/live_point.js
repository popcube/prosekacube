import styled from "styled-components";
import { TitleText, TextDiv, ImgContainer } from "./components/styled_tags";
import { useState } from "react";
import LivePointGraph from "./components/live_point_chart";


const ZeroPadding = (paramNum) => {
  if (paramNum > 9) {
    return paramNum.toString();
  }
  else {
    return "0" + paramNum.toString();
  }
}

const LivePointResult = () => {
  const [timeObj, setTimeObj] = useState(new Date());

  setInterval(() => {
    setTimeObj(new Date());
  }, 1000);

  const year = timeObj.getFullYear();
  const month = timeObj.getMonth();

  const endTime = new Date(year, month + 1, 1).getTime() - 1000;
  const startTime = new Date(year, month, 1).getTime();
  const nowTime = timeObj.getTime();

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
        {"現在時間は "}
        <text style={{ fontWeight: "bold" }}>{timeStr}</text>
        {" です。"}
      </TextDiv>
    )
  }

  const LivePointDue = () => {
    return (
      <TextDiv>
        {"現在のライブポイントの予想は "}
        <text style={{ fontWeight: "bold" }}>{livePointDue.toFixed(1)}</text>
        {" です。"}
      </TextDiv>
    )
  }

  const LivePointDueUnit = () => {
    return (
      <TextDiv>
        {"一日あたり "}
        <text style={{ fontWeight: "bold" }}>{livePointDay.toFixed(1)}</text>
        {"、一時間あたり "}
        <text style={{ fontWeight: "bold" }}>{livePointHour.toFixed(1)}</text>
        {" 増えていきます。"}
      </TextDiv>
    )
  }

  return (
    <div align="left">
      <TextDiv>
        <TitleText style={{ fontWeight: "normal" }}>ライブポイントを8000稼ぐまで</TitleText>
      </TextDiv>
      <TimeDiv />
      <LivePointDue />
      <LivePointDueUnit />
    </div>
  );
}

export default function LivePoint() {
  return (
    <div>
      <LivePointResult />
      <div style={{ marginTop: "30px" }}>
        <LivePointGraph />
      </div>
    </div>
  );
}