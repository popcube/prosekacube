import "./App.css";
import { MadSkillz } from "./mad_skillz";
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

const Container = styled(Body)`
  display: flex;
  justify-content: space-between;
  padding: 12px 64px 0;
  background-color: #757575;
`;

function App() {
  const [content, showContent] = useState("mad_skillz");
  return (
    <div>
      <h1>Contents List</h1>
      <button onClick={() => showContent("nothing")}>erase</button>
      <Container content={content} />
    </div>
  );
}

export default App;
