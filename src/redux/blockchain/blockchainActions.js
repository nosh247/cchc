import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import {
  SmartContract,
  ContractAddress,
  Networks,
} from "data/tokenContractAbi";
import { fetchData } from "redux/data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const disconnectRequest = () => {
  return {
    type: "DISCONNECT_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const disconnect = () => {
  return async (dispatch) => {
    dispatch(disconnectRequest());
  };
};

const { ethereum } = window;
const network = Networks.polygon;
const metamaskIsInstalled = ethereum && ethereum.isMetaMask;

export const connect = (callback) => {
  console.log("try connect");
  return async (dispatch) => {
    dispatch(connectRequest());

    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        const networkId = await ethereum.request({
          method: "net_version",
        });

        if (networkId === network.id) {
          const SmartContractObj = new Web3EthContract(
            SmartContract,
            ContractAddress
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          callback();
          // Add listeners end
        } else {
          dispatch(connectFailed(`Change network to ${network.name}.`));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  console.log("update accounts:", account);

  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
