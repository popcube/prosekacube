import "./App.css";
import { mad_skillz } from "./mad_skillz/mad_skillz";
import { useState } from "react";

function App() {
  const [content, showContent] = useState("mad_skillz");

  return (
    <div>
      <h4>コンテンツ一覧</h4>
      {
        switch(content){
          case "madSkillz":
            <mad_skillz />
          default:
            ;
        }
      }
    </div>
  );
}

export default App;
