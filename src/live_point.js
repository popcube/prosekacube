import styled from "styled-components";
import { useState } from "react";

const NowDiv = () => {
  const [timeStr, setTimeStr] = useState((new Date()).toString());

  setInterval(() => {
    setTimeStr((new Date()).toString());
  }, 1000);
  return (
    <div>
      {
        timeStr
      }
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