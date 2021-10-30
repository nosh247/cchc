import "./Footer.scss";
import iconHooman from "assets/30x30icon.png";
import igIcon from "assets/ig.svg";
import twIcon from "assets/tw.svg";
import dsIcon from "assets/discord.svg";

function Footer() {
  return (
    <div className="footer-wrapper">        
      <img src={iconHooman} alt="Cool Crypto Hoomans" />
      <span className="bold brand">COOL CRYPTO HOOMANS CLUB</span>
      <div className="footer-socials">
        <a
          className="social-link"
          href="https://instagram.com/cchoomans"
          title="Instagram"
          rel="noreferrer noopener"
          target="_blank"
        >
          <img src={igIcon} alt="Instagram" /><span className="polygon">@cchoomans</span>
        </a>
        <a
          className="social-link"
          href="https://twitter.com/cchoomans"
          title="Twitter"
          rel="noreferrer noopener"
          target="_blank"
        >
          <img src={twIcon} alt="Twitter" /><span className="polygon">@cchoomans</span>
        </a>
        <a
          className="social-link"
          href="https://discord.gg/bDs4SujCve"
          title="Discord"
          rel="noreferrer noopener"
          target="_blank"
        >
          <img src={dsIcon} alt="Discord" /><span className="polygon">cchc</span>
        </a>
      </div>
      {/* <a className="credit" target="_blank" href="https://www.freepik.com/vectors/background">Header background vector created by vectorpocket - www.freepik.com</a> */}
    </div>
  );
}

export default Footer;
