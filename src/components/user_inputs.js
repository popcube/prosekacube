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
  font-size: 90%;
  height: 22px;
`;

const ColoredSpan = styled.span`
  display: inline-block;
  background-color: #bcece0;
  padding: 0px 8px;
  margin: 0px 5px;
  font-size: 90%;
  height: 22px;
`;

const Label = styled.label`
  vertical-aligh: baseline;
`;

export const UserInput = ({ setNewLivePoint, setRecordDelete, setNewGoalPoint, setNewCookie }) => {
  const ifChecked = useRef(null);

  const [livePoint, setLivePoint] = useState("");
  const [goalPoint, setGoalPoint] = useState(8000);
  const [cookies, , removeCookie] = useCookies();
  useEffect(() => {
    if (cookies["goalPoint"] != null) {
      setGoalPoint(Number(cookies["goalPoint"]));
      ifChecked.current.checked = true;
      setNewCookie(true);
    }
  }, []);

  const submitLivePoint = (e) => {
    e.preventDefault();
    setNewLivePoint(livePoint);
    setNewCookie(ifChecked.current.checked);
  };

  const submitGoalPoint = (e) => {
    e.preventDefault();
    setNewGoalPoint(goalPoint);
    setNewCookie(ifChecked.current.checked);
  };

  const resetCookie = () => {
    removeCookie("goalPoint");
    removeCookie("data");
    setRecordDelete("all");
    setGoalPoint(8000);
    setNewGoalPoint(8000);
    setLivePoint("");
    setNewLivePoint("");
    ifChecked.current.checked = false;
  };

  return (
    <InputDiv>
      <form>
        <TextDiv>
          <a>記録を</a>
          <ColoredSpan>
            <Label htmlFor="storeDataCheck">保存します</Label>
            <input
              id="storeDataCheck"
              type="checkbox"
              name="storeDate"
              value="on"
              ref={ifChecked}
              onClick={(e) => setNewCookie(e.target.checked)}
            />
          </ColoredSpan>
          <Button type="button" onClick={resetCookie}>
            リセットします
          </Button>
        </TextDiv>
      </form>
      <form onSubmit={submitGoalPoint}>
        <TextDiv>
          <label>目標のライブポイント</label>
          <Input
            type="number"
            min="0"
            max="8000"
            value={goalPoint}
            onChange={(e) => setGoalPoint(e.target.value)}
          />
          <Button type="submit" name="setGoalPoint">
            OK
          </Button>
        </TextDiv>
      </form>
      <form onSubmit={submitLivePoint}>
        <TextDiv>
          <label>現在のライブポイント</label>
          <Input type="number" value={livePoint} onChange={(e) => setLivePoint(e.target.value)} />
          <Button type="submit" name="setLivePoint">
            OK
          </Button>
          <Button type="button" onClick={() => setRecordDelete("1")}>
            一つ削除
          </Button>
        </TextDiv>
      </form>
    </InputDiv>
  );
};
