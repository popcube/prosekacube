import "./App.css";
import { MadSkillz } from "./dynamic/mad_skillz";
import { useState } from "react";
import styled from "styled-components";

const Body = ({ content }) => {
  // return <div>some line</div>;
  switch (content) {
    case "mad_skillz":
      return <MadSkillz />;
    default:
      return <div>nothing detected</div>;
  }
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 64px 0;
`;

function App() {
  const [content, showContent] = useState("mad_skillz");
  return (
    <div>
      <h1>Contents List</h1>
      <button onClick={() => content === "mad_skillz" ? showContent("nothing") : showContent("mad_skillz")}>erase</button>
      <Container>
        <Body content={content} />
      </Container>
    </div>
  );
}

export default App;
