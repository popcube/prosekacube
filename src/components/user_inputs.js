// import "../css/user_inputs_inform.css";
import {
  TextDiv,
  Input,
  InputDiv,
  InputDiv2,
  Button,
  ActionText,
  CalcSpan,
  Select,
} from "./styled_tags";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { ModalResetConfirm } from "./modal";
import { TimeSpan } from "../live_point";
import { JSTOffset } from "./live_point_chart";
import { useSelector, useDispatch } from "react-redux";
import {
  initialLoad,
  infoSet,
  goalPointInput,
  dataInput,
  dataDeleteOnePoint,
  livePointsPerShowInput,
  cookieSet,
  allReset,
} from "../redux/livePointTracerSlice";

const ColoredSpan = styled.span`
  display: inline;
  background-color: #bcece0;
  font-size: 90%;
  padding: 0px 8px;
  margin: 0px 5px;
`;

const Label = styled.label`
  vertical-align: middle;
`;

const liveBonusTable = [1, 5, 10, 14, 17, 20, 21, 22, 23, 24, 25];
const goalPointInit = 10000

export const UserInput = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.livePointTracer.data);
  const cookieControl = useSelector((state) => state.livePointTracer.cookieControl);
  const info = useSelector((state) => state.livePointTracer.info);
  const goalPoint = useSelector((state) => state.livePointTracer.goalPoint);
  const livePointsPerShow = useSelector((state) => state.livePointTracer.livePointsPerShow);

  const ifChecked = useRef(null);
  const ifShowed = useRef(null);
  const ifGoalButton = useRef(null);
  const ifPointButton = useRef(null);
  const ifResetButton = useRef(null);
  const ifResetOneButton = useRef(null);

  const [livePoint, setLivePoint] = useState("");
  const [goalPointForm, setGoalPointForm] = useState(goalPointInit);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);
  const [latestRecordBuffer, setLatetRecordBuffer] = useState([]);

  useEffect(() => {
    dispatch(
      initialLoad({
        info: "ロードしました",
      })
    );
  }, []);

  useEffect(() => {
    ifChecked.current.checked = cookieControl;
  }, [cookieControl]);

  useEffect(() => {
    setGoalPointForm(goalPoint);
  }, [goalPoint]);

  useEffect(() => {
    if (data.length != 0) {
      setShowDiv2(true);
    } else if (ifShowed.current != null) {
      ifShowed.current.style.opacity = "0";
      ifShowed.current.style.transform = "translateY(-100%)";
    }
  }, [data]);

  useEffect(() => {
    if (ifShowed.current != null) {
      ifShowed.current.style.opacity = "1";
      ifShowed.current.style.transform = "none";
    }
  }, [ifShowed.current]);

  useEffect(() => {
    if (data != null) {
      if (data.length > 0) {
        setLatetRecordBuffer([data[data.length - 1].time, data[data.length - 1].record]);
      }
    }
  }, [data]);

  const actionTextEnd = () => {
    dispatch(infoSet(""));
    ifGoalButton.current.disabled = false;
    ifPointButton.current.disabled = false;
    ifResetButton.current.disabled = false;
    ifResetOneButton.current.disabled = false;
  };

  const checkStore = (e) => {
    dispatch(
      cookieSet({
        data: e.target.checked,
        infoSave: "保存しました",
        infoNoSave: "保存解除しました",
      })
    );
  };

  const submitLivePoint = (e) => {
    if (livePoint !== "") {
      ifPointButton.current.disabled = true;

      dispatch(
        dataInput({
          data: {
            time: new Date().getTime() + JSTOffset,
            record: livePoint,
          },
          infoSave: "保存しました",
          infoNoSave: "設定しました",
        })
      );
    }

    e.preventDefault();
  };

  const submitGoalPoint = (e) => {
    if (goalPointForm !== "") {
      ifGoalButton.current.disabled = true;

      dispatch(
        goalPointInput({
          data: goalPointForm,
          infoSave: "保存しました",
          infoNoSave: "設定しました",
        })
      );
    }

    e.preventDefault();
  };

  const selectLiveBonus = (e) => {
    dispatch(
      livePointsPerShowInput({
        data: e.target.value,
        infoSave: "保存しました",
        infoNoSave: "設定しました",
      })
    );
  };

  const resetCookie = () => {
    ifResetButton.current.disabled = true;

    dispatch(
      allReset({
        info: "リセットしました",
      })
    );

    setResetConfirm(false);
  };

  const resetOnePoint = () => {
    ifResetOneButton.current.disabled = true;

    dispatch(
      dataDeleteOnePoint({
        infoSave: "保存しました",
        infoNoSave: "設定しました",
      })
    );
  };

  const challengeLiveDueNum = ([curTime, curPt]) => {
    const curTimeObj = new Date(curTime);
    const endTimeDate = new Date(curTimeObj.getFullYear(), curTimeObj.getMonth() + 1, 0).getDate();
    const remainingDate = endTimeDate - curTimeObj.getDate() + 1;

    return Math.min(remainingDate, Math.ceil((goalPoint - curPt) / 30));
  };

  const normalLiveDueNum = ([curTime, curPt]) => {
    const challengeLiveNum = challengeLiveDueNum([curTime, curPt]);

    if (goalPoint - curPt <= 30 * challengeLiveNum) {
      return 0;
    } else {
      return Math.ceil((goalPoint - curPt - challengeLiveNum * 30) / livePointsPerShow);
    }
  };

  /* eslint-disable react/no-unknown-property */
  return (
    <div>
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
                  onClick={checkStore}
                />
              </ColoredSpan>
              <Button ref={ifResetButton} type="button" onClick={() => setResetConfirm(true)}>
                リセットします
              </Button>
              <ActionText toDisplay={info.length != 0} onAnimationEnd={actionTextEnd}>
                {info}
              </ActionText>
            </a>
          </TextDiv>
        </form>
        <form onSubmit={submitGoalPoint}>
          <TextDiv>
            <Label>目標のライブポイント</Label>
            <Input
              type="number"
              min="1"
              max={goalPointInit.toString()}
              value={goalPointForm}
              onChange={(e) => setGoalPointForm(e.target.value)}
            />
            <Button ref={ifGoalButton} type="submit" name="setGoalPointForm">
              OK
            </Button>
          </TextDiv>
        </form>
        <form onSubmit={submitLivePoint}>
          <TextDiv>
            <Label>現在のライブポイント</Label>
            <Input
              type="number"
              min="0"
              max={goalPointInit.toString()}
              value={livePoint}
              onChange={(e) => setLivePoint(e.target.value)}
              autoFocus={true}
            />
            <Button ref={ifPointButton} type="submit" name="setLivePoint">
              OK
            </Button>
            <Button ref={ifResetOneButton} type="button" onClick={resetOnePoint}>
              一つ削除
            </Button>
          </TextDiv>
        </form>
      </InputDiv>
      {showDiv2 && (
        <InputDiv2
          ref={ifShowed}
          onTransitionEnd={() => {
            if (data.length == 0) {
              setShowDiv2(false);
              dispatch(
                livePointsPerShowInput({
                  data: liveBonusTable[3],
                  infoSave: "",
                  infoNoSave: "",
                })
              );
              setLatetRecordBuffer([]);
            }
          }}
        >
          <div>
            <TextDiv>
              最後の記録は
              <TimeSpan timeObj={new Date(latestRecordBuffer[0])} />、
              <CalcSpan>{latestRecordBuffer[1]}</CalcSpan>
              ポイントです
            </TextDiv>
            <TextDiv>
              <Label>ライブボーナス消費設定が</Label>
              <Select name="liveBonusSetting" value={livePointsPerShow} onChange={selectLiveBonus}>
                {liveBonusTable.map((val, idx) => (
                  <option value={val} key={idx}>
                    {idx}
                  </option>
                ))}
              </Select>
              のとき、目標ポイントは
            </TextDiv>
            <TextDiv>
              通常ライブを
              <CalcSpan>{normalLiveDueNum(latestRecordBuffer)}</CalcSpan>
              回、チャレンジライブを
              <CalcSpan>{challengeLiveDueNum(latestRecordBuffer)}</CalcSpan>
              回で達成します
            </TextDiv>
            <TextDiv>※：デイリーボーナスポイントは含みません</TextDiv>
          </div>
        </InputDiv2>
      )}
      {resetConfirm && (
        <ModalResetConfirm confirm={resetCookie} cancel={() => setResetConfirm(false)} />
      )}
    </div>
  );
  /* eslint-enable */
};
