import "./StoryReader.scss";
import { imgIpfsURI } from "../../data/tokenContractAbi";

function StoryReader(props) {
  const { story, closeStory, imageUrl } = props;

  return (
    <div className="story-reader">
      <div className="story-close" onClick={(e) => closeStory(e)}>
        CLOSE
      </div>
      <div className="story-title">
        #{story.tokenId} {story.title}
      </div>
      <div className="story-nft">
        <img src={`${imgIpfsURI}${story.tokenId}.png`} />
      </div>
      <div className="story-body">{story.description}</div>
    </div>
  );
  //style={{ backgroundImage: `url("${imgIpfsURI}${data.token_id}.png")` }}
}

export default StoryReader;
