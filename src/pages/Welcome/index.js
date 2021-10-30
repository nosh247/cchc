import React from "react";
import ReactHtmlParser from "react-html-parser";
import Hero from "components/Hero";
import "./Welcome.scss";
import { opensea } from "data/links";
import { ContractAddress } from "data/tokenContractAbi";
import { NavLink } from "react-router-dom";

import landingData from "data/landingData";
import openseaIcon from "assets/opensea-logo.svg";
import polygonIcon from "assets/polygon-icon.svg";
import hoomanIcon from "assets/30x30icon.png";
import animatedHooman from "assets/animated-hooman.gif";

function Minted(props) {
  const { isAuthenticated, maxSupply, totalSupply } = props;
  return (
    isAuthenticated && (
      <h2 className="minted-subtitle">
        <span className="icon icon-crypto-human">
          <img src={hoomanIcon} alt="Cool Crypto Hoomans" />
        </span>{" "}
        Remaining:{" "}
        <span className="yellow">
          {(maxSupply - totalSupply).toLocaleString()}
        </span>
        of<span className="yellow">{maxSupply.toLocaleString()}</span>
      </h2>
    )
  );
}

function Welcome(props) {
  const {
    hasNFT,
    isAuthenticated,
    blockchain,
    maxSupply,
    totalSupply,
    feedback,
    paused,
  } = props;

  return (
    <React.Fragment>
      <Hero />
      <section className="welcome-text">
        <h2>
          {blockchain.account === "" || blockchain.smartContract === null
            ? landingData.loggedOutWelcome
            : landingData.loggedInWelcome}{" "}
        </h2>
      </section>
      <Minted
        isAuthenticated={isAuthenticated}
        maxSupply={maxSupply}
        totalSupply={totalSupply}
      />
      <span className="button-holder">
        <NavLink to="/mint" className={`button mint-button`}>
          Mint
        </NavLink>
      </span>
      <blockquote className="blocks">
        <span>
          Each <span className="bold">Cool Crypto Hooman</span> is dynamically
          generated from more than 150 traits some are rarer than others.
        </span>
      </blockquote>
      <blockquote className="animated-hooman-container">
        <div className="animated-image-wrapper">
          <img
            width="400"
            height="400"
            src={animatedHooman}
            alt="Cool Crypto Hoomans"
          />
        </div>
      </blockquote>

      <blockquote className="blocks">
        <span>
          Buying a Cool Crypto Hooman costs{" "}
          <span className="polygon upper bold" title="POLYGON MATIC">
            25 MATIC
          </span>{" "}
          to mint and will grant you access to our{" "}
          <a href="#meme" title="MEME ROOM">
            <span className="yellow upper bold">MEME ROOM</span>
          </a>{" "}
          where you can have fun with your nft in different ways, which will be
          announced in a later date.
        </span>
      </blockquote>
      <section className="button-wrapper">
        <span className="button-holder">
          <a
            className="opensea button"
            href={opensea}
            target="_blank"
            rel="noreferrer"
            title="opensea.io"
          >
            <img
              width="24"
              height="24"
              alt="https://opensea.io/"
              src={openseaIcon}
            />{" "}
            <span className="button-text">check on opensea.io</span>
          </a>
        </span>{" "}
        <span className="button-holder">
          <a
            className="contract button"
            href={`https://polygonscan.com/address/${ContractAddress}`}
            target="_blank"
            rel="noreferrer"
            title="smart contract"
          >
            <img
              width="24"
              height="24"
              alt="https://polygonscan.com/"
              src={polygonIcon}
            />{" "}
            <span className="button-text">{ContractAddress}</span>
          </a>
        </span>
      </section>
      {isAuthenticated && (
        <blockquote className="blocks mint" id="Mint" title="Mint">
          {!hasNFT && (
            <h2>
              Get your Cool Crypto Hooman to gain access to the{" "}
              <span className="polygon">MEME ROOM</span> for you NFT!{" "}
            </h2>
          )}
          {paused && <div>Minting is paused at the moment.</div>}
          <span className="button-holder">
            <NavLink to="/mint" className={`button mint-button`}>
              Mint
            </NavLink>
          </span>
          <div>{ReactHtmlParser(feedback)}</div>
        </blockquote>
      )}
    </React.Fragment>
  );
}
export default Welcome;
