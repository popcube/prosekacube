import "./App.css";
import { madSkillz } from "./mad_skillz";

const Container = () => {
  return <madSkillz />;
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
