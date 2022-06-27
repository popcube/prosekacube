import "./App.css";
import MadSkillz from "./dynamic/mad_skillz";
import LivePoint from "./live_point";
import LiveBonus from "./live_bonus";
import { useState } from "react";
import styled from "styled-components";

const Header = styled.header`
  // display: flex;
  justify-content: space-between;
  padding: 24px 64px 0;
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
  // font-weight: bold;
  border-bottom: ${props => props.focused ? '2px solid #F652A0' : 'none'};
`

const HeaderStr = "プロセカキューブ";

const Body = ({ content }) => {
  // return <div>some line</div>;
  switch (content) {
    case "mad_skillz":
      return <MadSkillz />;
    case "live_point":
      return <LivePoint />;
    case "live_bonus_calc":
      return <LiveBonus />;
    default:
      return <div>no button pushed</div>;
  }
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 64px 0;
`;

function App() {
  const [content, setContent] = useState("live_point");

  return (
    <div>
      <Header>
        <h1>{HeaderStr}</h1>
        <HeaderUl>
          <HeaderLi focused={content === 'live_point'} onClick={() => setContent("live_point")}>ライブポイント</HeaderLi>
          <HeaderLi focused={content === 'mad_skillz'} onClick={() => setContent("mad_skillz")}>皆伝称号</HeaderLi>
          <HeaderLi focused={content === 'live_bonus_calc'} onClick={() => setContent("live_bonus_calc")}>ライブボーナス消費量</HeaderLi>
        </HeaderUl>
      </Header>
      <Container>
        <Body content={content} />
      </Container>
    </div>
  );
}

export default App;
