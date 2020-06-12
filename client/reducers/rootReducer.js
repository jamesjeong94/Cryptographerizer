import currencyReducer from "./currencyReducer";
import chartReducer from "./chartReducer";
import sideChartReducer from "./sideChartReducer";
import { combineReducers } from "redux";

export default combineReducers({
  currency: currencyReducer,
  chart: chartReducer,
  sideChart: sideChartReducer,
});
