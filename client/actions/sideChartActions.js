import { GET_HIGH_VALUES } from "../constants/types";
import axios from "axios";

export const getHighValues = (currency) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: "/crypto/high",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        currency: currency,
      },
    })
      .then(({ data }) => {
        console.log(`Obtained high values for ${currency}`);
        dispatch({
          type: GET_HIGH_VALUES,
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
