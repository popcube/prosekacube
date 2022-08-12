import { TextDiv, Input, InputDiv, Button } from "./styled_tags";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { ModalResetConfirm } from "./modal";

const ColoredSpan = styled.span`
  display: inline-block;
  background-color: #bcece0;
  padding: 0px 8px;
  margin: 0px 5px;
  font-size: 90%;
  height: 90%;
`;

const Label = styled.label`
  vertical-align: middle;
`;

export const UserInput = ({ setNewLivePoint, setRecordDelete, setNewGoalPoint, setNewCookie }) => {
  const ifChecked = useRef(null);

  const [livePoint, setLivePoint] = useState("");
  const [goalPoint, setGoalPoint] = useState(8000);
  const [cookies, , removeCookie] = useCookies();
  const [resetConfirm, setResetConfirm] = useState(false);

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

    setResetConfirm(false);
  };

  return (
    <InputDiv>
      <form>
        <TextDiv>
          <a>
            記録を
            <ColoredSpan>
              <label style={{ verticalAlign: "middle" }} htmlFor="storeDataCheck">
                保存します
              </label>
              <input
                style={{ verticalAlign: "middle" }}
                id="storeDataCheck"
                type="checkbox"
                name="storeDate"
                value="on"
                ref={ifChecked}
                onClick={(e) => setNewCookie(e.target.checked)}
              />
            </ColoredSpan>
            <Button type="button" onClick={() => setResetConfirm(true)}>
              リセットします
            </Button>
          </a>
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
      {
        resetConfirm &&
        <ModalResetConfirm confirm={resetCookie} cancel={() => setResetConfirm(false)} />
      }
    </InputDiv>
  );
};
