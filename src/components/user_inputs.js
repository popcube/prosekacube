import { TextDiv } from "./styled_tags";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
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
  background-color: #bcece0;
  margin: 0px 5px;
  height: 22px;
`;

const InputDiv = styled.div`
  align: left;
  border: 1px solid;
  border-radius: 10px;
  padding-left: 10px;
`;

const ColoredDiv = styled.div`
  background-color: #bcece0;
  padding: 0px 8px;
  margin: 0px 5px;
`;

export const UserInput = ({ setNewLivePoint, setRecordReset, setNewGoalPoint, setNewCookie }) => {
  const ifChecked = useRef(null);
  ifChecked.checked = true;

  const [livePoint, setLivePoint] = useState("");
  const [goalPoint, setGoalPoint] = useState(8000);
  const [cookies, , removeCookie] = useCookies();
  useEffect(() => {
    if (cookies["goalPoint"] != null) {
      setGoalPoint(Number(cookies["goalPoint"]));
      // ifChecked.checked = true;
    }
  }, []);

  const submitData = (e) => {
    e.preventDefault();
    if (e.target.setGoalPoint == "on") {
      setNewGoalPoint(goalPoint);
    }
    if (e.target.setLivePoint == "on") {
      setNewLivePoint(livePoint);
    }
    if (e.target.storeData == "on") {
      setNewCookie(true);
    } else {
      setNewCookie(false);
    }
  };

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
  };

  return (
    <InputDiv>
      <form onSubmit={submitData}>
        <TextDiv>
          <label>記録を</label>
          <ColoredDiv>
            <label htmlFor="storeDataCheck">保存します</label>
            <input
              id="storeDataCheck"
              type="checkbox"
              name="storeDate"
              value="on"
              checked={livePoint == "8000" ? true : false}
              ref={ifChecked}
              onClick={(e) => setNewCookie(e.target.checked)}
            />
          </ColoredDiv>
          <Button type="button" onClick={resetCookie}>
            リセットします
          </Button>
        </TextDiv>
        <TextDiv>
          <label>目標のライブポイント</label>
          <Input
            type="number"
            min="0"
            max="8000"
            value={goalPoint}
            onChange={(e) => setGoalPoint(e.target.value)}
          />
          <Button type="submit" name="setGoalPoint" value="on">
            OK
          </Button>
        </TextDiv>
        <TextDiv>
          <label>現在のライブポイント</label>
          <Input type="number" value={livePoint} onChange={(e) => setLivePoint(e.target.value)} />
          <Button type="submit" name="setLivePoint" value="on">
            OK
          </Button>
          <Button type="button" onClick={setRecordReset}>
            リセット
          </Button>
        </TextDiv>
      </form>
    </InputDiv>
  );
};
