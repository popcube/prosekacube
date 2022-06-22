import "./App.css";
import { madSkillz } from "./mad_skillz";
import { useState } from "react";

const Body = () => {
  return <div>some line</div>;
  // switch (content) {
  //   case "mad_skillz":
  //     return madSkillz;
  //   default:
  //     return <div>nothing detected</div>;
  // }
};

function App() {
  return (
    <div>
      <h1>コンテンツ一覧</h1>
      <Body />
    </div>
  );
}

export default App;
