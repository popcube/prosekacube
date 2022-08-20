// import "../css/user_inputs_inform.css";
import {
  TextDiv,
  Input,
  InputDiv,
  InputDiv2,
  Button,
  ActionText,
  CalcSpan,
  Select
} from "./styled_tags";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { ModalResetConfirm } from "./modal";
import { TimeSpan } from "../live_point";
import { CookieExpiration, JSTOffset } from "./live_point_chart";
import { useSelector, useDispatch } from "react-redux";
import { goalPointInput } from "../redux/goalPointSlice";
import { dataInput, dataReset, dataDeleteOnePoint } from "../redux/dataSlice";

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

export const UserInput = ({
  timeObj,
  setNewLivePoint,
  setRecordDelete,
  setNewGoalPoint,
  setNewCookie,
  latestRecord,
  newGoalPoint
}) => {

  const reduxData = useSelector(state => state.data);
  const dispatch = useDispatch();
  console.log(reduxData);

  const year = timeObj.getFullYear();
  const month = timeObj.getMonth();
  const cookieExpirationObj = CookieExpiration(year, month);

  // console.log(cookieExpirationObj);

  const ifChecked = useRef(null);
  const ifShowed = useRef(null);
  const ifGoalButton = useRef(null);
  const ifPointButton = useRef(null);
  const ifResetButton = useRef(null);
  const ifResetOneButton = useRef(null);

  const [livePoint, setLivePoint] = useState("");
  const [goalPoint, setGoalPoint] = useState(8000);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [resetConfirm, setResetConfirm] = useState(false);
  const [livePointsPerShow, setLivePointsPerShow] = useState(liveBonusTable[3]);
  const [showDiv2, setShowDiv2] = useState(false);
  const [latestRecordBuffer, setLatetRecordBuffer] = useState([]);

  const [informer, setInformer] = useState("");

  useEffect(() => {

    if (localStorage.getItem("goalPoint") != null) {
      setGoalPoint(Number(localStorage.getItem("goalPoint")));
    }
    else if (cookies["goalPoint"] != null) {
      setGoalPoint(Number(cookies["goalPoint"]));
    }

    if (localStorage.getItem("liveBonus") != null) {
      setLivePointsPerShow(Number(localStorage.getItem("liveBonus")));
    }
    else if (cookies["liveBonus"] != null) {
      setLivePointsPerShow(Number(cookies["liveBonus"]));
    }

    if ((cookies["goalPoint"] != null || cookies["data"] != null || cookies["liveBonus"] != null) ||
      localStorage.getItem("goalPoint") != null || localStorage.getItem("data") != null || localStorage.getItem("liveBonus") != null) {
      ifChecked.current.checked = true;
      setNewCookie(true);
      setInformer("ロードしました");
    }

  }, []);

  useEffect(() => {
    if (latestRecord.length != 0) {
      setShowDiv2(true);
    }
    if (latestRecord.length == 0 && ifShowed.current != null) {
      ifShowed.current.style.opacity = "0";
      ifShowed.current.style.transform = "translateY(-100%)";
    }
  }, [latestRecord]);

  useEffect(() => {
    if (ifShowed.current != null) {
      ifShowed.current.style.opacity = "1";
      ifShowed.current.style.transform = "none";
    }
  }, [ifShowed.current]);

  useEffect(() => {
    if (latestRecord.length != 0) {
      setLatetRecordBuffer(latestRecord);
    }
  }, [latestRecord])

  const actionTextEnd = () => {
    setInformer("");
    ifGoalButton.current.disabled = false;
    ifPointButton.current.disabled = false;
    ifResetButton.current.disabled = false;
    ifResetOneButton.current.disabled = false;
  };

  const checkStore = (e) => {
    if (e.target.checked) {
      setNewCookie(true);
      // setCookie("liveBonus", livePointsPerShow, { path: '/prosekacube', expires: cookieExpirationObj });
      localStorage.setItem("liveBonus", livePointsPerShow);
      setInformer("保存しました");
    }
    else {
      setNewCookie(false);
    }
  };

  const submitLivePoint = (e) => {
    dispatch(dataInput({
      time: new Date().getTime() + JSTOffset,
      record: livePoint
    }));
    ifPointButton.current.disabled = true;
    e.preventDefault();
    setNewLivePoint(livePoint);
    if (ifChecked.current.checked) {
      setInformer("保存しました");
    }
    else {
      setInformer("設定しました");
    }
  };

  const submitGoalPoint = (e) => {
    dispatch(goalPointInput(goalPoint));
    ifGoalButton.current.disabled = true;
    e.preventDefault();
    setNewGoalPoint(goalPoint);
    if (ifChecked.current.checked) {
      setInformer("保存しました");
    }
    else {
      setInformer("設定しました");
    }
  };

  const selectLiveBonus = (e) => {
    setLivePointsPerShow(e.target.value);
    if (ifChecked.current.checked) {
      // setCookie("liveBonus", e.target.value, { path: '/prosekacube', expires: cookieExpirationObj });
      localStorage.setItem("liveBonus", e.target.value);
      setInformer("保存しました");
    }
    else {
      setInformer("設定しました");
    }
  };

  const resetCookie = () => {
    dispatch(dataReset());
    ifResetButton.current.diabled = true;
    ifChecked.current.checked = false;
    // setNewCookie(false);
    // setRecordDelete("all");
    // setGoalPoint(8000);
    // setNewGoalPoint(8000);
    // setLivePoint("");
    // setNewLivePoint("");

    removeCookie("liveBonus", { path: '/prosekacube' });
    removeCookie("goalPoint", { path: '/prosekacube' });
    removeCookie("data", { path: '/prosekacube' });

    localStorage.removeItem("liveBonus");
    localStorage.removeItem("goalPoint");
    localStorage.removeItem("data");

    setInformer("リセットしました");

    setResetConfirm(false);
  };

  const resetOnePoint = (e) => {
    dispatch(dataDeleteOnePoint());
    ifResetOneButton.current.disabled = true;
    setRecordDelete("1");
    setLivePoint("");
    setNewLivePoint("");
    if (ifChecked.current.checked) {
      setInformer("保存しました");
    }
    else {
      setInformer("削除しました");
    }
  };

  const challengeLiveDueNum = ([curTime, curPt]) => {
    const curTimeObj = new Date(curTime);
    const endTimeDate = new Date(curTimeObj.getFullYear(), curTimeObj.getMonth() + 1, 0).getDate();
    const remainingDate = endTimeDate - curTimeObj.getDate() + 1;

    return Math.min(remainingDate, Math.ceil((newGoalPoint - curPt) / 30));
  }

  const normalLiveDueNum = ([curTime, curPt]) => {
    const challengeLiveNum = challengeLiveDueNum([curTime, curPt]);

    if (newGoalPoint - curPt <= 30 * challengeLiveNum) {
      return 0;
    }
    else {
      return Math.ceil((newGoalPoint - curPt - challengeLiveNum * 30) / livePointsPerShow);
    }
  }

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
              <ActionText
                toDisplay={informer.length != 0}
                onAnimationEnd={actionTextEnd}
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
            <Button ref={ifGoalButton} type="submit" name="setGoalPoint">
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
              max={newGoalPoint}
              value={livePoint}
              onChange={(e) => setLivePoint(e.target.value)}
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
      {
        showDiv2 &&
        <InputDiv2 ref={ifShowed} onTransitionEnd={() => {
          if (latestRecord.length == 0) {
            setShowDiv2(false);
            setLivePointsPerShow(liveBonusTable[3]);
          }
        }} >
          <div>
            <TextDiv>
              最後の記録は
              <TimeSpan timeObj={new Date(latestRecordBuffer[0])} />
              、
              <CalcSpan>{latestRecordBuffer[1]}</CalcSpan>
              ポイントです
            </TextDiv>
            <TextDiv>
              <Label>ライブボーナス消費設定が</Label>
              <Select name="liveBonusSetting" value={livePointsPerShow} onChange={selectLiveBonus}>
                {liveBonusTable.map((val, idx) => <option value={val} key={idx}>{idx}</option>)}
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
          </div>
        </InputDiv2>
      }
      {
        resetConfirm &&
        <ModalResetConfirm confirm={resetCookie} cancel={() => setResetConfirm(false)} />
      }
    </div>
  );
};
