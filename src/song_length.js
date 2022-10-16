import { ImgContainer } from "./components/styled_tags";

import song_length_latest from "./docs/figs/song_length_latest.png";
import song_length_all from "./docs/figs/song_length_all.png";

export default function SongLength() {
  return (
    <div>
      <ImgContainer latest={true} src={song_length_latest} title="楽曲の長さ推移（一か月）" alt="楽曲の長さ推移（一か月）のグラフ" />
      <ImgContainer src={song_length_all} title="楽曲の長さ推移（全期間）" alt="楽曲の長さ推移のグラフ（全期間）" />
    </div>
  );
}