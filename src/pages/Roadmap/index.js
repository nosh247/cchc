import ReactHtmlParser from "react-html-parser";
import { roadmapData } from "data/roadmapData";
import "./StretchGoal.scss";
import iconHooman from "assets/30x30icon.png";

function StretchGoal(props) {
  let { percent, title, description } = props;
  return (
    <div className="goal-wrapper">
      <div className="goal-header">
        <img src={iconHooman} width="50" height="50" alt="Stretch Goal" />
        <div className="percent yellow">{percent}</div>
        <div className="hyphen yellow">-</div>
        <div className="title yellow">{title}</div>
      </div>
      <div className="goal-description">{ReactHtmlParser(description)}</div>
    </div>
  );
}

function Roadmap() {
  return (
    <section id="Roadmap" className="section-block" title="Roadmap">
      <h1>Roadmap</h1>
      <blockquote className="roadmap-description">
        Here are our stretch goals, we will be working on the following list as
        we reach them. Thank you for sticking around and reading through!
      </blockquote>
      <blockquote>
        {roadmapData.map((o, i) => (
          <StretchGoal key={i} {...o} />
        ))}
      </blockquote>
    </section>
  );
}

export default Roadmap;
