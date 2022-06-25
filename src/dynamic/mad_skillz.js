import styled from "styled-components";

// python auto-generation part 1 start
import img_latest from "./../docs/figs/latest/2022_06_24.png"
import img_0 from "./../docs/figs/2021_12_31.png"
import img_1 from "./../docs/figs/2022_01_31.png"
import img_2 from "./../docs/figs/2022_02_24.png"
// python auto-generation part 1 end

const img_names = ["2021/12/31", "2022_01_31", "2022_02_24"];

const LatestImgDiv = styled.div`
  padding: 12px 64px 12px;
  background-color: #F652A0;
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 64px 12px;
  background-color: #BCECE0;
`;

const TitleText = styled.text`
  font-weight: bold;
  font-size: 150%;
  background-color: #BCECE0;
`

const LatestImgContainer = ({ src, title }) => {
  return (
    <LatestImgDiv>
      <div align="left">
        <TitleText>
          {title}
        </TitleText>
      </div>
      <div align="left">
        <img src={src} alt={title} />
      </div>
    </LatestImgDiv>
  )
}

const ImgContainer = ({ src, title }) => {
  return (
    <ImgDiv>
      <div align="left">
        <TitleText>
          {title}
        </TitleText>
      </div>
      <div align="left">
        <img src={src} alt={title} />
      </div>
    </ImgDiv>
  )
}

// python auto-generation part 2 start
const DynamicImgContainers = () => {
  return (
    <div>
      <ImgContainer src={img_0} alt="" />
      <ImgContainer src={img_1} alt="" />
      <ImgContainer src={img_2} alt="" />
    </div>
  )
}
// python auto-generation part 2 end

export const MadSkillz = () => {
  return (
    <div align="center">
      <LatestImgContainer src={img_latest} title="最新の皆伝レベル" />
      <DynamicImgContainers />
    </div>
  );
};
