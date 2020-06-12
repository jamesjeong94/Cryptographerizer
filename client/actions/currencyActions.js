import { CHANGE_CURRENCY, GET_CURRENCY_DATA } from "../constants/types";
import axios from "axios";

export const changeCurrency = (currency) => {
  return {
    type: CHANGE_CURRENCY,
    payload: currency,
  };
};

export const getCurrencyData = (currency) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: "/crypto",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        currency: currency,
      },
    })
      .then(({ data }) => {
        console.log("Obtained data for :", currency);
        dispatch({
          type: GET_CURRENCY_DATA,
          payload: data,
        });
        dispatch({
          type: CHANGE_CURRENCY,
          payload: currency,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
