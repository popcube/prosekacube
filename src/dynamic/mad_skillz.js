import styled from "styled-components";

// python auto-generation part 1 start
import img_latest from "./../docs/figs/latest/2022_06_24.png";
import img_0 from "./../docs/figs/2021_12_31.png";
import img_1 from "./../docs/figs/2022_01_31.png";
import img_2 from "./../docs/figs/2022_02_24.png";
import img_3 from "./../docs/figs/2022_03_31.png";
import img_4 from "./../docs/figs/2022_04_28.png";
import img_5 from "./../docs/figs/2022_05_31.png";
// python auto-generation part 1 end

const LatestImgDiv = styled.div`
  padding: 12px 64px 12px;
  background-color: #F652A0;
`;

const ImgDiv = styled.div`
  padding: 12px 64px 12px;
  background-color: #BCECE0;
`;

const TitleText = styled.text`
  font-weight: bold;
  font-size: 150%;
  background-color: #BCECE0;
`

const LatestImgContainer = ({ src, title, alt }) => {
  return (
    <LatestImgDiv>
      <div align="left">
        <TitleText>
          {title}
        </TitleText>
      </div>
      <div align="left">
        <img src={src} alt={alt} />
      </div>
    </LatestImgDiv>
  )
}

const ImgContainer = ({ src, title, alt }) => {
  return (
    <ImgDiv>
      <div align="left">
        <TitleText>
          {title}
        </TitleText>
      </div>
      <div align="left">
        <img src={src} alt={alt} />
      </div>
    </ImgDiv>
  )
}

// python auto-generation part 2 start
const DynamicImgContainers = () => {
  return (
    <div>
      <ImgContainer src={img_0} title="2021/12/31時点のレベル" alt="2021/12/31時点のグラフ" />
      <ImgContainer src={img_1} title="2022/01/31時点のレベル" alt="2022/01/31時点のグラフ" />
      <ImgContainer src={img_2} title="2022/02/24時点のレベル" alt="2022/02/24時点のグラフ" />
      <ImgContainer src={img_3} title="2022/03/31時点のレベル" alt="2022/03/31時点のグラフ" />
      <ImgContainer src={img_4} title="2022/04/28時点のレベル" alt="2022/04/28時点のグラフ" />
      <ImgContainer src={img_5} title="2022/05/31時点のレベル" alt="2022/05/31時点のグラフ" />
    </div>
  )
}
// python auto-generation part 2 end

export const MadSkillz = () => {
  return (
    <div align="center">
      <LatestImgContainer src={img_latest} title="最新の皆伝レベル" alt="最新の皆伝レベルグラフ" />
      <DynamicImgContainers />
    </div>
  );
};
