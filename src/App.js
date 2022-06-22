import "./App.css";
import { madSkillz } from "./mad_skillz/mad_skillz";
import { useState } from "react";

function App() {
  const [content, showContent] = useState("mad_skillz");

  return (
    <div>
      <h4>コンテンツ一覧</h4>
      {() => {
        switch (content) {
          case "mad_skillz":
            return madSkillz();
          default:
            return;
        }
      }}
    </div>
  );
}

export default App;
