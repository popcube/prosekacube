// import React from 'react';
import Plot from 'react-plotly.js';
import twt_data from './dynamic/twt_data';
import { useEffect, useState, useRef } from "react";
import {
  TextDiv,
  Input,
  InputDiv,
  InputDiv2,
  Button,
  ActionText,
  CalcSpan,
} from "./components/styled_tags";


const xArr = [...Array(1000)].map((_, i) => i)
const yArr = [...Array(1000)].map((_, i) => i * i)
console.log(xArr)
console.log(yArr)

export default function main() {
  const [show1, setShow1] = useState(false);
  const ifShowed1 = useRef(null);

  useEffect(() => {
    if (show1 && ifShowed1.current != null) {
      ifShowed1.current.style.opacity = "1";
      ifShowed1.current.style.transform = "none";
    }
    else if (!show1 && ifShowed1.current != null) {
      true;
      ifShowed1.current.style.opacity = "0";
      ifShowed1.current.style.transform = "translateY(-100%)";
    }
  }, [ifShowed1.current]);

  return (
    <div>
      <div onClick={() => setShow1(!show1)}>click here</div>
      {show1 && (
        <InputDiv>
          <Plot
            data={[
              {
                x: twt_data[0].x,
                y: twt_data[0].y,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
              }
            ]}
            layout={{ width: 1000, height: 800, title: 'A Fancy Plot' }}
          />
        </InputDiv>
      )
      }
      {show1 && (
        <InputDiv>
          <Plot
            data={[
              {
                x: twt_data[0].x,
                y: twt_data[0].y,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
              }
            ]}
            layout={{ width: 1000, height: 800, title: 'A Fancy Plot' }}
          />
        </InputDiv>
      )
      }
    </div>
  );
}
