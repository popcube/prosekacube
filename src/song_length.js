import { ImgContainer } from "./components/styled_tags";

import song_length from "./docs/figs/latest/2022_08_15.png";

export default function SongLength() {
  return (
    <div>
      <ImgContainer latest={true} src={song_length} title="楽曲の長さ推移" alt="楽曲の長さ推移のグラフ" />
    </div>
  );
}