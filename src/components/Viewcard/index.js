import "./viewcard.scss";
function Viewcard(props) {
  let { name, image } = props;

  return (
    <div className="image-wrapper">
      <img src={image.default} width={300} height={300} alt={name} />
    </div>
  );
}

export default Viewcard;
