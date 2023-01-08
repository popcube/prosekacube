import "./App.css";
import MadSkillz from "./dynamic/mad_skillz";
import LivePoint from "./live_point";
import LiveBonus from "./live_bonus";
import SongLength from "./song_length";
import { useState } from "react";
import styled from "styled-components";
import { TextDiv, TitleDiV } from "./components/styled_tags";

const FaqDiv = styled(TitleDiV)`
  margin-top: 30px;
  margin-bottom: 10px;
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
  font-size: 50%;
`

const HeaderDiv = styled.div`
  display: flex;
`

const Header = styled.header`
  justify-content: space-between;
  padding: 24px 64px 0;
  white-space: nowrap;
  border-bottom: 1px solid #D0D0D0;
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

const HeaderFaqDiv = styled.div`
  margin: auto 0 0 auto;
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

const Faq = () => {
  return (
    <div>
      <FaqDiv>
        Q. 誰が運営しているの？
      </FaqDiv>
      <TextDiv>
        プロセカ・ボカロファンのWBが運営しています。お問い合わせは以下からお願いします。
      </TextDiv>
      <TextDiv>
        <a href="https://twitter.com/whity_ity" target="_blank" rel="noreferrer">WBのツイッター</a>
      </TextDiv>
      <TextDiv>
        <a href="https://note.com/whity_breath" target="_blank" rel="noreferrer">WBのnotes</a>
      </TextDiv>
      <FaqDiv>
        Q. コンテンツは何？
      </FaqDiv>
      <TextDiv>
        プロセカ用のツールや、ゲームコンテンツの推移グラフなどがあります。
      </TextDiv>
      <TextDiv>
        notesで詳しく内容を説明しているものもあります。リークやゲーム自体の解析はありません。
      </TextDiv>
      <TextDiv>
        WBのウェブサイト作成の勉強も兼ねています。
      </TextDiv>
      <FaqDiv>
        Q. 公式と関係ある？
      </FaqDiv>
      <TextDiv>
        関係はありません。
      </TextDiv>
      <TextDiv>
        広告フリーです。
      </TextDiv>
    </div >
  )
}

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
      return <SongLength />;
    case "faq":
      return <Faq />;
    default:
      return <div>no button pushed</div>;
  }
};



function App() {
  const [content, setContent] = useState("live_point");

  return (
    <div>
      <Header>
        <HeaderDiv>
          <TitleH1>
            プロセカキューブ
          </TitleH1>
          <NoticeP>
            当サイトはファンの運営で、公式とは一切関係がありません
          </NoticeP>
        </HeaderDiv>
        <HeaderDiv>
          <HeaderUl>
            <HeaderLi focused={content === 'live_point'} onClick={() => setContent("live_point")}>ライブポイント</HeaderLi>
            <HeaderLi focused={content === 'mad_skillz'} onClick={() => setContent("mad_skillz")}>皆伝称号</HeaderLi>
            <HeaderLi focused={content === 'live_bonus_calc'} onClick={() => setContent("live_bonus_calc")}>ライブボーナス消費量</HeaderLi>
            <HeaderLi focused={content === 'song_length'} onClick={() => setContent("song_length")}>推移グラフ</HeaderLi>
          </HeaderUl>
          <HeaderFaqDiv focused={content === 'faq'} onClick={() => setContent("faq")}>
            このサイトについて
          </HeaderFaqDiv>
        </HeaderDiv>
      </Header>
      <Container>
        <Body content={content} />
      </Container>
    </div>
  );
}

export default App;
