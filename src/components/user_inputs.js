import { TextDiv } from "./styled_tags";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Input = styled.input`
  border-radius: 1px;
  padding: 0px 8px;
  width: 50px;
  margin: 0px 5px;
`;

const Button = styled.button`
  border-radius: 1px;
  padding: 0px 8px;
  background-color: #BCECE0;
  margin: 0px 5px;
  height: 22px;
`;

const InputDiv = styled.div`
  align: left;
  border: 1px solid;
  border-radius: 10px;
  padding-left: 10px;
`;

export const UserInput = ({ setNewLivePoint, setRecordReset, setNewGoalPoint, setNewCookie }) => {
  const [livePoint, setLivePoint] = useState("");
  const [goalPoint, setGoalPoint] = useState(8000);
  const [cookies, , removeCookie] = useCookies();
  useEffect(() => {
    if (cookies["goalPoint"] != null) {
      setGoalPoint(Number(cookies["goalPoint"]));
    }
  }, [])

  const submitLivePoint = (e) => {
    e.preventDefault();
    setNewLivePoint(livePoint);
  };

  const submitGoalPoint = (e) => {
    e.preventDefault();
    setNewGoalPoint(goalPoint);
  };

  const resetCookie = () => {
    removeCookie("goalPoint");
    removeCookie("data");
    setRecordReset();
    setGoalPoint(8000);
    setNewGoalPoint(8000);
  }

  return (
    <InputDiv>
      <form>
        <TextDiv>
          <label>記録を</label>
          <Button type="button" onClick={setNewCookie}>保存</Button>
          <Button type="button" onClick={resetCookie}>リセット</Button>
          <label>します</label>
        </TextDiv>
      </form>
      <form onSubmit={submitGoalPoint}>
        <TextDiv>
          <label>目標のライブポイント</label>
          <Input type="number" value={goalPoint} onChange={(e) => setGoalPoint(e.target.value)} />
          <Button type="submit">OK</Button>
        </TextDiv>
      </form>
      <form onSubmit={submitLivePoint}>
        <TextDiv>
          <label>現在のライブポイント</label>
          <Input type="number" value={livePoint} onChange={(e) => setLivePoint(e.target.value)} />
          <Button type="submit">OK</Button>
          <Button type="button" onClick={setRecordReset}>
            リセット
          </Button>
        </TextDiv>
      </form>
    </InputDiv>
  );
};
