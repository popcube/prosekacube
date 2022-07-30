import { TextDiv, TitleText } from "./styled_tags";
import styled from "styled-components";
import { useState } from "react";

const Input = styled.input`
  border-radius: 1px;
  padding: 0px 8px;
  width: 50px;
  margin-left: 10px;
`;

const Button = styled.button`
  border-radius: 1px;
  padding: 0px 8px;
  background-color: #bcece0;
  margin-left: 10px;
  height: 22px;
`;

export const UserInput = ({ setNewLivePoint, setRecordReset, setNewGoalPoint, setNewCookie }) => {
  const [livePoint, setLivePoint] = useState("");
  const [goalPoint, setGoalPoint] = useState(8000);

  const submitLivePoint = (e) => {
    e.preventDefault();
    setNewLivePoint(livePoint);
  };

  const submitGoalPoint = (e) => {
    e.preventDefault();
    setNewGoalPoint(goalPoint);
  };

  const submitCookie = (e) => e.preventDefault();

  return (
    <div align="left">
      <form onSubmit={submitLivePoint}>
        <TextDiv>
          <label>あなたの現在のライブポイント</label>
          <Input type="number" value={livePoint} onChange={(e) => e.target.value != "" ? setLivePoint(e.target.value) : {}} />
          <Button type="submit">OK</Button>
          <Button type="button" onClick={setRecordReset}>
            リセット
          </Button>
        </TextDiv>
      </form>
      <form onSubmit={submitGoalPoint}>
        <TextDiv>
          <label>あなたの目標のライブポイント</label>
          <Input type="number" value={goalPoint} onChange={(e) => e.target.value != "" ? setGoalPoint(e.target.value) : {}} />
          <Button type="submit">OK</Button>
        </TextDiv>
      </form>
      <form onSubmit={submitCookie}>
        <TextDiv>
          <label>あなたのデータを保存します</label>
          <Button type="button" onClick={setNewCookie}>OK</Button>
        </TextDiv>
      </form>
    </div>
  );
};
