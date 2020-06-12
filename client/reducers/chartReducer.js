import { CHANGE_LIMIT } from "../constants/types";

const initState = {
  limit: {},
};

const chartReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_LIMIT:
      return {
        limit: action.payload,
      };
    default:
      return state;
  }
};

export default chartReducer;
