import { GET_HIGH_VALUES } from "../constants/types";

const initState = {
  high: {},
};

const sideChartReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_HIGH_VALUES: {
      return {
        high: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default sideChartReducer;
