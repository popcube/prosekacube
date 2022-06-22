import "./App.css";
import latestPic from "./docs/figs/latest/2022_06_20.png";

const Container = () => {
  return <div>none detected</div>;
};

function App() {
  return (
    <div>
      <h1>コンテンツ一覧</h1>
      <img src={latestPic} alt="" />
      <Container />
    </div>
  );
}

export default App;
