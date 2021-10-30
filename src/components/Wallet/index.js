import "./Wallet.scss";
function Wallet(props) {
  let { account } = props;
  let { ethereum } = window;
  let wallerAddress = account ? account.substr(0, 4) + "..." + account.substr(account.length - 4, account.length) : "";

  const openMetamask = () => {
    ethereum.request({ method: 'eth_requestAccounts' });
  };

  return (
    <div className="wallet-wrapper" onClick={() => openMetamask()}>
      <span className="wallet-address">{wallerAddress}</span>
    </div>
  );
}

export default Wallet;
