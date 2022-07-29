import { TextDiv, TitleText } from "./styled_tags";
import styled from "styled-components";
import { useState } from "react";

const Input = styled.input`
  border-radius: 1px;
  padding: 0px 8px;
  width: 40px;
  margin-left: 10px;
`;

const Button = styled.button`
  border-radius: 1px;
  padding: 0px 8px;
  background-color: #bcece0;
  margin-left: 10px;
`;

export const UserInput = ({ setNewLivePoint, setRecordReset, setNewGoalPoint }) => {
  const [livePoint, setLivePoint] = useState("");
  const [goalPoint, setGoalPoint] = useState("");

  const submitLivePoint = (e) => {
    e.preventDefault();
    setNewLivePoint(livePoint);
  };

  const submitGoalPoint = (e) => {
    e.preventDefault();
    setNewGoalPoint(goalPoint);
  };

  return (
    <div align="left">
      <form onSubmit={submitLivePoint}>
        <TextDiv>
          <label>あなたの現在のライブポイント</label>
          <Input type="number" value={livePoint} onChange={(e) => setLivePoint(e.target.value)} />
          <Button type="submit">追加</Button>
          <Button type="button" onClick={setRecordReset}>
            リセット
          </Button>
        </TextDiv>
      </form>
      <form onSubmit={submitGoalPoint}>
        <TextDiv>
          <label>あなたの目標のライブポイント</label>
          <Input type="number" value={goalPoint} onChange={(e) => setGoalPoint(e.target.value)} />
        </TextDiv>
      </form>
    </div>
  );
};
