import "./Faq.scss";
import { faqData } from "data/faqData";

function Faqa(props) {
  let { question, answer } = props;
  return (
    <div className="faq-qa">
      <div className="faq-question bold">
        <span className=" yellow">Q:</span> {question}
      </div>
      <div className="faq-answer">
        <span className="bold polygon">A:</span> {answer}
      </div>
    </div>
  );
}

function Faq(props) {
  return (
    <section id="Faq" className="section-block" title="Faq">
      <h1>FAQ </h1>
      <blockquote className="faq-description">
        {faqData.map((o, i) => (
          <Faqa key={i} {...o} />
        ))}
      </blockquote>
    </section>
  );
}
export default Faq;
