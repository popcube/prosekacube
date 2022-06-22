import "./App.css";
import { madSkillz } from "./mad_skillz";
import { useState } from "react";

function App() {
  const [content, showContent] = useState("mad_skillz");

  const Body = () => {
    switch (content) {
      case "mad_skillz":
        return madSkillz;
      default:
        return <div>nothing detected</div>;
    }
  };

  return (
    <div>
      <h1>コンテンツ一覧</h1>
      <Body />
    </div>
  );
}

export default App;
