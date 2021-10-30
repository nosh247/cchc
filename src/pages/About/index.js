import './AboutUs.scss';
import ReactHtmlParser from "react-html-parser";
import {aboutUsData} from 'data/aboutUsData';
function About() {
  return (
    <section id="About" className="section-block" title="About">
      <h1>About me</h1>
      <blockquote className="aboutus-description">
        {ReactHtmlParser(aboutUsData.info)}
      </blockquote>
      
    </section>
  );
}

export default About;
