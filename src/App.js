import "./App.css";
import MadSkillz from "./dynamic/mad_skillz";
import LivePoint from "./live_point";
import LiveBonus from "./live_bonus";
import SongLength from "./song_length";
import { useState } from "react";
import styled from "styled-components";

const TitleDiv = styled.div`
  display: flex;
  justify-content: flex-start;
`

const TitleH1 = styled.h1`
  display: inline-block;
  padding: 5px 10px;
  margin-right: 20px;
  border: 10px solid;
  border-image: linear-gradient(to bottom right, #4C5270, #36EEE0, #BCECE0, #36EEE0) 1;
  background: linear-gradient(to bottom right, #36EEE0, #BCECE0, #36EEE0, #4C5270);
`

const NoticeP = styled.p`
  display: inline-block;
  margin: auto 0 20px auto;
  padding: 6px 12px;
  border-width: 1px;
  border-style: solid none;
  border-color: #4C5270;
`

const Header = styled.header`
  justify-content: space-between;
  padding: 24px 64px 0;
  border-bottom: 1px solid #D0D0D0;
  white-space: nowrap
`

const HeaderUl = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
`

const HeaderLi = styled.li`
  list-style: none;
  padding: 4px 12px;
  cursor: pointer;
  border-bottom: ${props => props.focused ? '2px solid #F652A0' : 'none'};
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 64px 0;
`;

const Body = ({ content }) => {
  // return <div>some line</div>;
  switch (content) {
    case "mad_skillz":
      return <MadSkillz />;
    case "live_point":
      return <LivePoint />;
    case "live_bonus_calc":
      return <LiveBonus />;
    case "song_length":
      return <SongLength />
    default:
      return <div>no button pushed</div>;
  }
};



function App() {
  const [content, setContent] = useState("live_point");

  return (
    <div>
      <Header>
        <TitleDiv>
          <TitleH1>
            プロセカキューブ
          </TitleH1>
          <NoticeP>
            当サイトはファンの運営で、公式とは一切関係がありません
          </NoticeP>
        </TitleDiv>
        <HeaderUl>
          <HeaderLi focused={content === 'live_point'} onClick={() => setContent("live_point")}>ライブポイント</HeaderLi>
          <HeaderLi focused={content === 'mad_skillz'} onClick={() => setContent("mad_skillz")}>皆伝称号</HeaderLi>
          <HeaderLi focused={content === 'live_bonus_calc'} onClick={() => setContent("live_bonus_calc")}>ライブボーナス消費量</HeaderLi>
          <HeaderLi focused={content === 'song_length'} onClick={() => setContent("song_length")}>楽曲の長さ</HeaderLi>
        </HeaderUl>
      </Header>
      <Container>
        <Body content={content} />
      </Container>
    </div>
  );
}

export default App;
