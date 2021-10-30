import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import "./MintPage.scss";
import iconHooman from "assets/30x30icon.png";
import Logo from "components/Logo";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchNfts } from "redux/data/dataActions";
import Web3 from "web3";

function NFT({ tokenId }) {
  const [metaDataIPFS, setMetaDataIPFS] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [metaimage, setMetaimage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rarity, setRarity] = useState();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);

  const Metadata = async (tokenId) => {
    await blockchain.smartContract.methods
      .tokenURI(tokenId)
      .call()
      .then((e) => {
        setMetaDataIPFS(true);
        let uri = e.split("ipfs://").join("https://ipfs.io/ipfs/");
        fetch(uri)
          .then((response) => response.json())
          .then((resp) => {
            setMetadata(resp);
            let imageUri = resp.image
              .split("ipfs://")
              .join("https://ipfs.io/ipfs/");
            setMetaimage(imageUri);
          });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (metaDataIPFS === null && !loading) {
      setLoading(true);
      Metadata(tokenId);
    }
  }, [metaDataIPFS, loading]);

  return (
    <div className="owned-token">
      {loading && <span>Loading...</span>}
      {metadata && (
        <div className="nft-content">
          <img className="nft-image" src={metaimage} alt={metadata.name} />
          <div className="content">
            <span>{metadata.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function MintPage(props) {
  let {
    isAuthenticated,
    Login,
    Mint,
    paused,
    maxSupply,
    totalSupply,
    claimingNft,
    feedback,
  } = props;
  const [soldOut, setSoldOut] = useState(false);
  const [mintButtonText, setMintButtonText] = useState("Mint Now!");
  const [mintAmount, setMintAmount] = useState(1);
  const [nfts, setNfts] = useState([]);
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);

  const getNfts = () => {
    if (
      data.nftTokens === null &&
      blockchain.account !== "" &&
      blockchain.smartContract !== null
    ) {
      dispatch(fetchNfts(blockchain.account));
    }
  };

  const maxMint = 5;

  useEffect(() => {
    getNfts();
    setNfts(data.nftTokens);

    if (Number(totalSupply) === Number(maxSupply) && Number(maxSupply) > 0) {
      setSoldOut(true);
    } else {
      setSoldOut(false);
    }

    if (claimingNft) {
      setMintButtonText("Busy");
    } else if (soldOut) {
      setMintButtonText("Sold Out");
    } else {
      setMintButtonText("Mint Now!");
    }

    if (!isAuthenticated) {
      Login();
    }
  }, [
    isAuthenticated,
    paused,
    claimingNft,
    nfts,
    totalSupply,
    maxSupply,
    soldOut,
    feedback,
  ]);

  let onInputUpdate = (e) => {
    const re = /^[0-9\b]+$/;
    if (re.test(e.target.value)) {

      let amount = parseInt(e.target.value)

      if ( amount> maxMint) setMintAmount(maxMint);
      else if (amount === 0) setMintAmount(1);
      else setMintAmount(amount);
    }
  };

  return (
    <div className="mint-wrapper">
      <div className="mint-header">
        <h1>
          <span>
            <img
              width="100"
              height="100"
              src={iconHooman}
              alt="Cool Crypto Hoomans"
            />
          </span>
          <span>
            <Logo /> MINT PAGE
          </span>
        </h1>
      </div>
      {!paused && (
        <section className="nfts-stats-wrapper">
          <div className="nfts-stats">
            Remaining: <span className="yellow">{maxSupply - totalSupply}</span>{" "}
            of <span className="yellow">{maxSupply.toLocaleString()}</span>
          </div>
          <div className="form-wrapper">
            <div>
              Mint:{" "}
              <input
                tabIndex="1"
                className="amount-field"
                type="text"
                value={mintAmount}
                onChange={(e) => onInputUpdate(e)}
              />{" "}
              for me please.
            </div>
          </div>
          <div className="mint-button-wrapper">
            <Button
              tabIndex="2"
              buttonText={mintButtonText}
              onClickCallback={() => Mint(mintAmount)}
              nogutter={true}
              buttonClass={`mint-button ${
                soldOut || claimingNft ? "inactive" : ""
              }`}
            />
          </div>
          <div className="feedback-message">{ReactHtmlParser(feedback)}</div>
          <div className="disclaimer">
            Each crypto hooman will cost{" "}
            <span className="polygon disclaimer">25 $MATIC</span>
          </div>
          <div className="disclaimer">
            You can mint a max of 5 nfts per transaction.
          </div>
          <hr />
          <h2>MY NFTS:</h2>
          {nfts && (
            <div className="owned-tokens">
              {nfts.map((o, i) => (
                <NFT key={o} tokenId={o} />
              ))}
            </div>
          )}
          {/* <div>is paused: {paused}</div> */}
          {/* <div>sold out: {soldOut}</div> */}
        </section>
      )}
    </div>
  );
}
export default MintPage;
