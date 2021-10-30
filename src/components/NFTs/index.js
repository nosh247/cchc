
function NFTs(props) {
  let { ownedTokens } = props;
  return (
    ownedTokens &&
    ownedTokens.length &&
    isAuthenticated && (
      <section className="section-block owned-nfts">
        <h2>Your Cool Crypto Hoomans:</h2>
        {ownedTokens.map((t, i) => (
          <OwnedNFT key={`owned${i}`} id={t} />
        ))}{" "}
      </section>
    )
  );
}
export default NFTs;
