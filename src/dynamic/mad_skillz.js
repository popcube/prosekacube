import { ImgContainer } from "./../components/styled_tags"

// python auto-generation part 1 start
import img_latest from "./../docs/figs/latest/2022_11_04.png";
import img_0 from "./../docs/figs/2022_10_31.png";
import img_1 from "./../docs/figs/2022_09_30.png";
import img_2 from "./../docs/figs/2022_08_29.png";
import img_3 from "./../docs/figs/2022_07_30.png";
import img_4 from "./../docs/figs/2022_06_30.png";
import img_5 from "./../docs/figs/2022_05_31.png";
import img_6 from "./../docs/figs/2022_04_28.png";
import img_7 from "./../docs/figs/2022_03_31.png";
import img_8 from "./../docs/figs/2022_02_24.png";
import img_9 from "./../docs/figs/2022_01_31.png";
import img_10 from "./../docs/figs/2021_12_31.png";
// python auto-generation part 1 end

// python auto-generation part 2 start
const DynamicImgContainers = () => {
  return (
    <div>
      <ImgContainer src={img_0} title="2022/10/31時点のレベル" alt="2022/10/31時点のグラフ" />
      <ImgContainer src={img_1} title="2022/09/30時点のレベル" alt="2022/09/30時点のグラフ" />
      <ImgContainer src={img_2} title="2022/08/29時点のレベル" alt="2022/08/29時点のグラフ" />
      <ImgContainer src={img_3} title="2022/07/30時点のレベル" alt="2022/07/30時点のグラフ" />
      <ImgContainer src={img_4} title="2022/06/30時点のレベル" alt="2022/06/30時点のグラフ" />
      <ImgContainer src={img_5} title="2022/05/31時点のレベル" alt="2022/05/31時点のグラフ" />
      <ImgContainer src={img_6} title="2022/04/28時点のレベル" alt="2022/04/28時点のグラフ" />
      <ImgContainer src={img_7} title="2022/03/31時点のレベル" alt="2022/03/31時点のグラフ" />
      <ImgContainer src={img_8} title="2022/02/24時点のレベル" alt="2022/02/24時点のグラフ" />
      <ImgContainer src={img_9} title="2022/01/31時点のレベル" alt="2022/01/31時点のグラフ" />
      <ImgContainer src={img_10} title="2021/12/31時点のレベル" alt="2021/12/31時点のグラフ" />
    </div>
  )
}
// python auto-generation part 2 end

export default function MadSkillz() {
  return (
    <div>
      <ImgContainer latest={true} src={img_latest} title="最新の皆伝称号の対応レベル" alt="最新の皆伝称号の対応レベルのグラフ" />
      <DynamicImgContainers />
    </div>
  );
}
