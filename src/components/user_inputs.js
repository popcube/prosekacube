import { TextDiv, TitleText } from "./styled_tags";
import styled from "styled-components";
import { useState } from "react";

const Input = styled.input`
  border-radius: 1px;
  padding: 0px 8px;
  width: 40px;
  margin-left: 10px;
`;

export const UserInput = ({ setNewLivePoint, setRecordReset }) => {
  const [livePoint, setLivePoint] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    setNewLivePoint(livePoint);
  };
  return (
    <div align="left">
      <form onSubmit={submitForm}>
        <TextDiv>
          <label>あなたの現在のライブポイント</label>
          <Input type="number" value={livePoint} onChange={(e) => setLivePoint(e.target.value)} />
          <button type="submit">追加</button>
          <button type="button" onClick={setRecordReset}>
            リセット
          </button>
        </TextDiv>
      </form>
    </div>
  );
};
