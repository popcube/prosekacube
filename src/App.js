import "./App.css";
import { MadSkillz } from "./mad_skillz";
import { useState } from "react";

const Body = ({ content }) => {
  // return <div>some line</div>;
  switch (content) {
    case "mad_skillz":
      return (
        <div>
          <MadSkillz />
        </div>
      );
    default:
      return <div>nothing detected</div>;
  }
};

function App() {
  const [content, showContent] = useState("mad_skillz");
  return (
    <div>
      <h1>Contents List</h1>
      <button onClick={showContent("nothing")}>erase</button>
      <Body content={content} />
    </div>
  );
}

export default App;
