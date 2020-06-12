import { connect } from "react-redux";
import CryptoChart from "../components/CryptoChart.jsx";

const mapStateToProps = (state) => {
  return {
    currency: state.currency.currency,
    data: state.currency.data,
  };
};

export default connect(mapStateToProps)(CryptoChart);
