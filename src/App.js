import "./App.css";
import { MadSkillz } from "./mad_skillz";
import { useState } from "react";

const Body = ({ content }) => {
  // return <div>some line</div>;
  switch (content) {
    case "mad_skillz":
      return (
        <div>
          <div>here comes a line</div>
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
      <h1>コンテンツ一覧</h1>
      <Body content={content} />
    </div>
  );
}

export default App;
