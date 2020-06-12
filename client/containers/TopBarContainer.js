import { connect } from "react-redux";
import TopBar from "../components/TopBar.jsx";
import { bindActionCreators } from "redux";
import { getCurrencyData, changeCurrency } from "../actions/currencyActions";
import { getHighValues } from "../actions/sideChartActions.js";

const mapStateToProps = (state) => {
  return {
    currency: state.currency.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeCurrency: (e) => {
    //   return dispatch(changeCurrency(e.target.value));
    // },
    getHighValues: (e) => {
      return dispatch(getHighValues(e.target.value));
    },
    getCurrencyData: (e) => {
      return dispatch(getCurrencyData(e.target.value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
