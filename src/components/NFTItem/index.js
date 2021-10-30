import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import {
  SmartContract,
  networks,
  networksText,
  imgIpfsURI,
  ContractAddress,
  NetworksText,
} from "../../data/tokenContractAbi";
import "./NFTItem.scss";

function NFTItem(props) {
  let { data, handleItemClick, stories } = props;
  const [errorUri, setErrorUri] = useState(false);
  const [hasStory, setHasStory] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const { Moralis, user } = useMoralis();

  const getMetaData = async () => {
    const options = {
      address: ContractAddress,
      token_id: data.token_id,
      chain: NetworksText.rinkeby,
    };
    // const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
    //   options
    // );
    // console.log("tokenIdMetadata:", tokenIdMetadata);
  };

  const getTokenUri = async () => {
    const options = {
      address: ContractAddress,
      token_id: data.token_id,
      chain: "rinkeby",
    };
    // const response = await Moralis.Web3API.token.getTokenIdMetadata(options);
    // console.log(JSON.parse(response.metadata));
  };

  useEffect(() => {
    if (!hasStory) {
      let foundStory = stories.find(
        (o) => o.tokenId.toString() === data.token_id.toString()
      );
      if (foundStory) setHasStory(true);
    }

    //loadImage(`${imgIpfsURI}${data.token_id}.png`);
  }, [hasStory]);

  const loadImage = (url) => {
    const promise = new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        //console.log(image);
        setImgUrl(url);
        resolve(image);
      };
      image.src = url;
    });
  };

  //style={{ backgroundImage: `url("${imgIpfsURI}${data.token_id}.png")` }}
  return (
    <div className="nft-wrapper">
      {!loading && imgUrl && (
        <img className="nft-image" alt={data.token_id} src={imgUrl} />
      )}
      <span className="nft-title">NFT: #{data.token_id}</span>
      <button onClick={(e) => getMetaData(e)}>get metadata</button>
      <button onClick={(e) => getTokenUri(e)}>get token_uri</button>
      {!errorUri && hasStory && (
        <div
          className="read-story"
          onClick={() => handleItemClick(data.token_id)}
        >
          <span>read story...</span>
        </div>
      )}
    </div>
  );
}

export default NFTItem;
