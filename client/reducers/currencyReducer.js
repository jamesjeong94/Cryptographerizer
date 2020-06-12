import { CHANGE_CURRENCY, GET_CURRENCY_DATA } from "../constants/types";

const initState = {
  currency: "BTC",
  data: [],
};

const currencyReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    case GET_CURRENCY_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default currencyReducer;
