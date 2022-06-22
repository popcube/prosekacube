import "./App.css";
import latestPic from "./docs/figs/latest/2022_06_20.png";

function ContentSwitch(Content) {
  switch (Content) {
    case "mad_skillz":
      return <div>mad_skillz selected</div>;
    default:
      return <div>none selected</div>;
  }
}

async function App() {
  return (
    <div>
      <h1>コンテンツ一覧</h1>
      <img src={latestPic} alt="" />
      {ContentSwitch("mad_skillz")}
    </div>
  );
}

export default App;
