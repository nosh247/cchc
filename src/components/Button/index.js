import "./Button.scss";
function Button(props) {
  const {
    buttonClass,
    onClickCallback,
    buttonText,
    buttonIcon,
    uppercase,
    nogutter,
  } = props;
  return (
    <span className={`button-holder`}>
      <span
        className={`button ${buttonClass} ${nogutter ? "nogutter" : ""} ${
          uppercase ? "uppercase" : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
          onClickCallback();
        }}
      >
        {buttonIcon && (
          <img
            width="24"
            height="24"
            alt="https://opensea.io/"
            src={buttonIcon}
          />
        )}{" "}
        <span className="button-text">{buttonText}</span>
      </span>
    </span>
  );
}
export default Button;
