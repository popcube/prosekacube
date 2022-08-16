// import "../css/user_inputs_inform.css";
import { TextDiv, Input, InputDiv, Button, ActionText } from "./styled_tags";
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

const Informer = ({ informText, toDisplay, onAnimationEnd }) => {
  return (
    <ActionText toDisplay={toDisplay} onAnimationEnd={onAnimationEnd}>
      {informText}
    </ActionText>
  );
};

export const UserInput = ({ setNewLivePoint, setRecordDelete, setNewGoalPoint, setNewCookie }) => {
  const ifChecked = useRef(null);

  const [livePoint, setLivePoint] = useState("");
  const [goalPoint, setGoalPoint] = useState(8000);
  const [cookies, , removeCookie] = useCookies();
  const [resetConfirm, setResetConfirm] = useState(false);

  const [informer, setInformer] = useState("");

  useEffect(() => {
    if (cookies["goalPoint"] != null) {
      setGoalPoint(Number(cookies["goalPoint"]));
      ifChecked.current.checked = true;
      setNewCookie(true);
    }
    if (cookies["goalPoint"] != null || cookies["data"] != null) {
      setInformer("ロードしました");
    }
  }, []);

  const submitLivePoint = (e) => {
    e.preventDefault();
    setNewLivePoint(livePoint);
    if (ifChecked.current.checked) {
      setNewCookie(true);
      setInformer("保存しました");
    }
    else {
      setNewCookie(false);
      setInformer("設定しました");
    }
  };

  const submitGoalPoint = (e) => {
    e.preventDefault();
    setNewGoalPoint(goalPoint);
    if (ifChecked.current.checked) {
      setNewCookie(true);
      setInformer("保存しました");
    }
    else {
      setNewCookie(false);
      setInformer("設定しました");
    }
  };

  const resetCookie = () => {
    ifChecked.current.checked = false;
    removeCookie("goalPoint", { path: '/' });
    removeCookie("data", { path: '/' });
    setRecordDelete("all");
    setGoalPoint(8000);
    setNewGoalPoint(8000);
    setLivePoint("");
    setNewLivePoint("");
    setInformer("リセットしました");

    setResetConfirm(false);
  };

  // console.log(informer);

  return (
    <InputDiv>
      <form>
        <TextDiv>
          <a>
            記録を
            <ColoredSpan>
              <Label style={{ verticalAlign: "middle" }} htmlFor="storeDataCheck">
                保存します
              </Label>
              <input
                style={{ verticalAlign: "middle" }}
                id="storeDataCheck"
                type="checkbox"
                name="storeDate"
                value="on"
                ref={ifChecked}
                onClick={(e) => {
                  if (e.target.checked) {
                    setNewCookie(true);
                    setInformer("保存しました");
                  }
                  else {
                    setNewCookie(false);
                  }
                }}
              />
            </ColoredSpan>
            <Button type="button" onClick={() => setResetConfirm(true)}>
              リセットします
            </Button>
            <ActionText
              toDisplay={informer.length != 0}
              onAnimationEnd={() => setInformer("")}
            >
              {informer}
            </ActionText>
          </a>
        </TextDiv>
      </form>
      <form onSubmit={submitGoalPoint}>
        <TextDiv>
          <Label>目標のライブポイント</Label>
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
          <Label>現在のライブポイント</Label>
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
