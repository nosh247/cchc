// log
import store from "redux/store";
/*General Data*/ 
const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();

      let maxSupply = await store
        .getState()
        .blockchain.smartContract.methods.maxSupply()
        .call();

      let paused = await store
        .getState()
        .blockchain.smartContract.methods.paused()
        .call();

      let cost = await store
        .getState()
        .blockchain.smartContract.methods.cost()
        .call();

      dispatch(
        fetchDataSuccess({
          maxSupply,
          totalSupply,
          paused,
          cost,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};

/*NFTS*/
const fetchNftsRequest = () => {
  return {
    type: "CHECK_NFTS_REQUEST",
  };
};

const fetchNftsSuccess = (payload) => {
  return {
    type: "CHECK_NFTS_SUCCESS",
    payload: payload,
  };
};
export const fetchNfts = (account) => {
  return async (dispatch) => {
    dispatch(fetchNftsRequest());
    try {
      let nftTokens = await store
        .getState()
        .blockchain.smartContract.methods.walletOfOwner(account)
        .call();

      console.log("response:", nftTokens);

      dispatch(
        fetchNftsSuccess({
          nftTokens
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};

