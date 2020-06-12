import { connect } from "react-redux";
import SideData from "../components/SideData.jsx";

const mapStateToProps = (state) => {
  return {
    currency: state.currency.currency,
    data: state.sideChart.high,
  };
};

export default connect(mapStateToProps)(SideData);
