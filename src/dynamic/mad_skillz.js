import styled from "styled-components";
import { TitleDiv, ImgContainer } from "./../components/styled_tags"

// python auto-generation part 1 start
import img_latest from "./../docs/figs/latest/2022_08_15.png";
import img_0 from "./../docs/figs/2022_07_30.png";
import img_1 from "./../docs/figs/2022_06_30.png";
import img_2 from "./../docs/figs/2022_05_31.png";
import img_3 from "./../docs/figs/2022_04_28.png";
import img_4 from "./../docs/figs/2022_03_31.png";
import img_5 from "./../docs/figs/2022_02_24.png";
import img_6 from "./../docs/figs/2022_01_31.png";
import img_7 from "./../docs/figs/2021_12_31.png";
// python auto-generation part 1 end

// python auto-generation part 2 start
const DynamicImgContainers = () => {
  return (
    <div>
      <ImgContainer src={img_0} title="2022/07/30時点のレベル" alt="2022/07/30時点のグラフ" />
      <ImgContainer src={img_1} title="2022/06/30時点のレベル" alt="2022/06/30時点のグラフ" />
      <ImgContainer src={img_2} title="2022/05/31時点のレベル" alt="2022/05/31時点のグラフ" />
      <ImgContainer src={img_3} title="2022/04/28時点のレベル" alt="2022/04/28時点のグラフ" />
      <ImgContainer src={img_4} title="2022/03/31時点のレベル" alt="2022/03/31時点のグラフ" />
      <ImgContainer src={img_5} title="2022/02/24時点のレベル" alt="2022/02/24時点のグラフ" />
      <ImgContainer src={img_6} title="2022/01/31時点のレベル" alt="2022/01/31時点のグラフ" />
      <ImgContainer src={img_7} title="2021/12/31時点のレベル" alt="2021/12/31時点のグラフ" />
    </div>
  )
}
// python auto-generation part 2 end

export default function MadSkillz() {
  return (
    <div align="center">
      <ImgContainer latest={true} src={img_latest} title="最新の皆伝称号の対応レベル" alt="最新の皆伝称号の対応レベルのグラフ" />
      <DynamicImgContainers />
    </div>
  );
}
