import { ImgContainer } from "./components/styled_tags"

import img_1 from "./docs/livebonus_rec1.png";
import img_2 from "./docs/livebonus_rec2.png";

export default function LiveBonus() {
  return (
    <div align="left">
      <ImgContainer src={img_1} title="ライブボーナス消費量オススメ１" alt="ライブボーナス消費量オススメのグラフ" />
      <ImgContainer src={img_2} title="ライブボーナス消費量オススメ２" alt="ライブボーナス消費量オススメ２のグラフ" />
    </div>
  );
}
