import "./Hero.scss";
import ReactHtmlParser from "react-html-parser";
import heroBackground from "assets/background-city.jpg";
import hooDoggo from "assets/hoo-doggo.png";
import bottom from "assets/bottom-cover.png";
import Particles from "react-tsparticles";
import { title, description } from "./variable";
import { random } from "./particlesConfig";

const style = {
  backgroundImage: `url(${heroBackground})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center center",
};

const bottomStyle = {
  position:'absolute',
  bottom: '-20px',
  backgroundImage: `url(${bottom})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "bottom left",
  width: '100%',
  height: '100px'
}

function Hero() {
  return (
    <div id="Home" title="Home" className="hero-banner" style={style}>
      <Particles params={random} />
      <div className="floating-article">
        <div className="title">{ReactHtmlParser(title)}</div>
        <div className="description">
          <span>{ReactHtmlParser(description)}</span>
        </div>
        <img alt="HOO-DOGGO" width="288" height="352" className="hoo-doggo" src={hooDoggo} />
      </div>
      <div className="bottom-cover" style={bottomStyle}></div>
    </div>
  );
}

export default Hero;
