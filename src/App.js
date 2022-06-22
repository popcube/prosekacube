import "./App.css";
import { useState } from "react";

function App() {
  const [content, showContent] = useState("mad_skillz");

  return (
    <div>
      <h4>コンテンツ一覧</h4>
      <button onClick={showContent("others")}> 終了</button>
      {() => {
        switch (content) {
          case "mad_skillz":
            return (
              <img src="./docs/figs/latest/2022_06_20.png" alt="latest mad skill requirement" />
            );
          default:
            return;
        }
      }}
    </div>
  );
}

export default App;
