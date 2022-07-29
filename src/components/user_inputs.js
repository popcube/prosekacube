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

export const UserInput = ({ setNewLivePoint, setRecordReset }) => {
  const [livePoint, setLivePoint] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    setNewLivePoint(livePoint);
  };

  const onButtonReset = () => {
    setRecordReset;
    setLivePoint("");
  };

  return (
    <div align="left">
      <form onSubmit={submitForm}>
        <TextDiv>
          <label>あなたの現在のライブポイント</label>
          <Input type="number" value={livePoint} onChange={(e) => setLivePoint(e.target.value)} />
          <Button type="submit">追加</Button>
          <Button type="button" onClick={onButtonReset}>
            リセット
          </Button>
        </TextDiv>
      </form>
    </div>
  );
};
