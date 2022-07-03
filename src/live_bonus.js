import styled from "styled-components";
import { ImgContainer, TextDiv } from "./components/styled_tags"
import { useState } from "react";

import img_1 from "./docs/livebonus_rec1.png";
import img_2 from "./docs/livebonus_rec2.png";

export default function LiveBonus() {
  return (
    <div align="left">
      <TextDiv>
        <a href="https://note.com/whity_breath/n/n7496ddddbdd2#ziAnC">一つ目のグラフの説明（note.com）</a>
      </TextDiv>
      <TextDiv>
        <a href="https://note.com/whity_breath/n/n5f375008c126#RIejr">二つ目のグラフの説明（note.com）</a>
      </TextDiv>
      <ImgContainer src={img_1} title="ライブボーナス消費量オススメ１" alt="ライブボーナス消費量オススメのグラフ" />
      <ImgContainer src={img_2} title="ライブボーナス消費量オススメ２" alt="ライブボーナス消費量オススメ２のグラフ" />
    </div>
  );
}