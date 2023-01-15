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
import styled from "styled-components";


// const xArr = [...Array(1000)].map((_, i) => i)
// const yArr = [...Array(1000)].map((_, i) => i * i)
// console.log(xArr)
// console.log(yArr)

const PlotlyDiv = styled(InputDiv)`
  margin: 30px 0px;
`

export default function main() {
  const [show1, setShow1] = useState(false);

  return (
    <div>
      <PlotlyDiv>
        <Plot
          data={[
            {
              x: twt_data.raw_1H.x,
              y: twt_data.raw_1H.y,
              type: 'scatter',
              mode: 'lines',
              marker: { color: 'black' },
            }
          ]}
          layout={{ width: 1000, height: 800, title: 'フォロワー数推移' }}
        />
      </PlotlyDiv>
      <PlotlyDiv>
        <Plot
          data={[
            {
              x: twt_data.cut_diff_1H.x,
              y: twt_data.cut_diff_1H.y,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'grey' },
              name: "フィルター後データ"
            },
            {
              x: twt_data.trend_1H.x,
              y: twt_data.trend_1H.y,
              type: 'scatter',
              mode: 'lines',
              marker: { color: 'blue' },
              name: "トレンドライン"
            },
          ]}
          layout={{
            width: 1000,
            height: 800,
            title: 'フォロワー数増減量（/分）推移',
            annotations: [            // all "annotation" attributes: #layout-annotations
              {
                text: 'simple annotation',    // #layout-annotations-text
                x: 0,                         // #layout-annotations-x
                xref: 'paper',                // #layout-annotations-xref
                y: 0,                         // #layout-annotations-y
                yref: 'paper'                 // #layout-annotations-yref
              },],
            showlegend: true,
            legend:
            {
              x: 1,
              xanchor: 'right',
              y: 1
            }
          }}
        />
      </PlotlyDiv>

      <div onClick={() => setShow1(!show1)}>click here</div>
      {show1 && (
        <InputDiv>
          <Plot
            data={[
              {
                x: twt_data.raw_1H.x,
                y: twt_data.raw_1H.y,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'black' },
              }
            ]}
            layout={{ width: 1000, height: 800, title: 'フォロワー数推移' }}
          />
        </InputDiv>
      )
      }
    </div>
  );
}
