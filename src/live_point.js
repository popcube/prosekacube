import styled from "styled-components";
import { TitleText } from "./components/styled_tags"
import { useState } from "react";


const ZeroPadding = (paramNum) => {
  if (paramNum > 9) {
    return paramNum.toString();
  }
  else {
    return "0" + paramNum.toString();
  }
}

const NowDiv = () => {
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

  const timeStr = "現在時間は YYYY/MM/DD HH:MM:SS です。"
    .replace("YYYY", year)
    .replace("MM", month + 1)
    .replace("DD", timeObj.getDate())
    .replace("HH", zeroPadHours)
    .replace("MM", zeroPadMinutes)
    .replace("SS", zeroPadSeconds);

  const livePointDueString = "ライブポイントの必要予想進捗は "
    + livePointDue.toFixed(1)
    + " です。";

  const livePointDueUnit = "一日あたり "
    + livePointDay.toFixed(1)
    + "、一時間あたり "
    + livePointHour.toFixed(1)
    + " 増えていきます。";

  return (
    <div align="left">
      <div>{timeStr}</div>
      <div>{livePointDueString}</div>
      <div>{livePointDueUnit}</div>
    </div>
  );
}

export const LivePoint = () => {
  return (
    <div>
      <NowDiv />
    </div>
  )
}