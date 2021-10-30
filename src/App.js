import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connect, disconnect } from "redux/blockchain/blockchainActions";
import { fetchData } from "redux/data/dataActions";
import Web3 from "web3";

import NavMenu from "components/NavMenu";
import Button from "components/Button";
import Footer from "components/Footer";

import Welcome from "pages/Welcome";
import Wallet from "components/Wallet";
import Roadmap from "pages/Roadmap";
import Faq from "pages/Faq";
import About from "pages/About";
import Showcase from "pages/Showcase";
import MintPage from "pages/MintPage";
import { ContractAddress } from "data/tokenContractAbi";

import "./App.scss";

function Error(props) {
  let { message } = props;
  return <div className="error-msg">{message}</div>;
}

function useDidMount() {
  const didMountRef = useRef(true);

  useEffect(() => {
    didMountRef.current = false;
  }, []);
  return didMountRef.current;
}

function App() {
  const didMount    = useDidMount();
  const dispatch    = useDispatch();
  const blockchain  = useSelector((state) => state.blockchain);
  const data        = useSelector((state) => state.data);

  const [feedback, setFeedback] = useState("");
  const [claimingNft, setClaimingNft] = useState(false);
  const [cost, setCost] = useState(10);
  const [ownedTokens, setOwnedTokens] = useState([]);

  const [maxSupply, setMaxSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();

    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setMaxSupply(!isNaN(Number(data.maxSupply)) ? Number(data.maxSupply) : 0);
    setTotalSupply(
      !isNaN(Number(data.totalSupply)) ? Number(data.totalSupply) : 0
    );
    setPaused(data.paused);

    let web3 = new Web3();
    setCost(web3.utils.fromWei(data.cost.toString(), "ether"));
    setOwnedTokens(data.walletOfOwner);
  }, [
    blockchain.account,
    blockchain.smartContract,
    data.maxSupply,
    data.totalSupply,
    data.paused,
    data.cost,
    data.walletOfOwner,
    isAuthenticated,
  ]);

  const Logout = () => {
    dispatch(disconnect());
  };

  const Mint = async (_amount = 1) => {
    setFeedback(
      "<div class='mint-feedback'><span class='bold'>Minting...</span></div>"
    );
    let web3 = new Web3();
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(_amount)
      .send({
        gasLimit: "285000",
        to: ContractAddress,
        from: blockchain.account,
        value: web3.utils.toWei(cost, "ether") * _amount,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("<div class='mint-feedback'><span class='bold'>Sorry, something went wrong.</span></div>");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "<div class='mint-feedback'><span class='bold'>Thank you for adopting a Cool Crypto Hooman!</span><br/>Check it out on <a class='view-mint' href='https://opensea.io/account' target='_blank'>opensea.io</a></div>"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const Login = () => {
    console.log("login...");
    dispatch(connect(getData));
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <header className="App-header">
              <NavMenu setFeedback={setFeedback} isAuthenticated={isAuthenticated} Logout={Logout} />
              <Welcome
                blockchain={blockchain}
                isAuthenticated={isAuthenticated}
                maxSupply={maxSupply}
                totalSupply={totalSupply}
                feedback={feedback}
                claimingNft={claimingNft}
                paused={paused}
                ownedTokens={ownedTokens}
                mint={Mint}
              />
            </header>
            <Showcase />
            <About />
            <Roadmap />
            <Faq cost={cost} isAuthenticated={isAuthenticated} />
          </Route>
          <Route path="/mint">
            <header className="App-header">
              <NavMenu setFeedback={setFeedback} isAuthenticated={isAuthenticated} Logout={Logout} />
              <MintPage
                isAuthenticated={isAuthenticated}
                Login={Login}
                Mint={Mint}
                paused={paused}
                ownedTokens={ownedTokens}
                maxSupply={maxSupply}
                totalSupply={totalSupply}
                claimingNft={claimingNft}
                feedback={feedback}
              />
            </header>
          </Route>
        </Switch>
        {isAuthenticated && <Wallet account={blockchain.account} />}
        {!isAuthenticated && (
          <Button
            buttonClass={`login-button`}
            onClickCallback={Login}
            buttonText="Connect Wallet"
            width={"300px"}
            nogutter={true}
            uppercase={true}
          />
        )}
        <Footer />
        {blockchain.errorMsg && <Error message={blockchain.errorMsg} />}
      </div>
    </Router>
  );
}

export default App;
