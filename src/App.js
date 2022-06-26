import "./App.css";
import { MadSkillz } from "./dynamic/mad_skillz";
import { LivePoint } from "./live_point";
import { useState } from "react";
import styled from "styled-components";

const Body = ({ content }) => {
  // return <div>some line</div>;
  switch (content) {
    case "mad_skillz":
      return <MadSkillz />;
    case "live_point":
      return <LivePoint />;
    default:
      return <div>button nothing pushed</div>;
  }
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 64px 0;
`;

function App() {
  const [content, setContent] = useState("mad_skillz");

  return (
    <div>
      <h1>Contents List</h1>
      <button onClick={() => setContent("mad_skillz")}>mad skillz</button>
      <button onClick={() => setContent("live_point")}>live point</button>
      <button onClick={() => setContent("nothing")}>erase</button>
      <Container>
        <Body content={content} />
      </Container>
    </div>
  );
}

export default App;
