import React, { useEffect, useState } from "react";
import NFTItem from "../NFTItem";
import StoryReader from "../StoryReader";
import jsonData from "../../data/stories.json";
import "./NFTList.scss";

const localData = JSON.parse(JSON.stringify(jsonData));

function NFTList(props) {
  const { nfts } = props;
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleClick = (id) => {
    let found = nfts.find((o) => o.token_id === id);
    let storyFound = localData.find((o) => o.tokenId.toString() === id.toString());
    if(found) showNFTStory(storyFound);
    else alert("story not found");
    //setLoading(true);

    // try {
    //   fetch(found.token_uri)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       let imageHash = data.image.split("/")[2];
    //       let imgUrl = `https://ipfs.moralis.io:2053/ipfs/${imageHash}/${data.edition}.png`;
    //       console.log(imgUrl);
    //       setImageUrl(imgUrl);
    //       setLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log("Error loading image");
    //       setStory(null);
    //       setLoading(false);
    //     });
    // } catch (err) {
    //   console.log("Error fetching image");
    //   setStory(null);
    //   setLoading(false);
    // }

    // let found = localData.find((o) => o.tokenId.toString() === id.toString());
    // if (found) showNFTStory(found);
  };

  const closeStory = (id) => {
    setStory(null);
  };

  const showNFTStory = (story) => {
    setStory(story);
    //console.log(story);
  };

  return (
    <div className="nft-container">
      {nfts &&
        nfts.map((nft, i) => (
          <NFTItem key={`item${i}`} handleItemClick={handleClick} stories={localData} data={nft} />
        ))}      
      {story && (
        <div className="story-wrapper">
          <StoryReader
            story={story}
            imageUrl={imageUrl}
            closeStory={closeStory}
          />
        </div>
      )}
    </div>
  );
}
export default NFTList;
