const initialState = {
  loading: false,
  maxSupply: 0,
  totalSupply: 0,
  cost: 0,
  paused: false,
  nftTokens: null,
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        maxSupply: action.payload.maxSupply,
        totalSupply: action.payload.totalSupply,
        cost: action.payload.cost,
        paused: action.payload.paused,
        error: false,
        errorMsg: "",
      };
    case "CHECK_NFTS_SUCCESS":
      return {
        ...state,
        loading: false,
        nftTokens: action.payload.nftTokens,
        error: false,
        errorMsg: "",
      };
    case "CHECK_TOKENURI_SUCCESS":
      return {
        ...state,
        loading: false,
        tokenUri: action.payload.tokenUri,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
