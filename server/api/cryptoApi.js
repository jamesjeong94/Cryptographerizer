const queryString = require("query-string");
const axios = require("axios");
require("dotenv").config();

const BCHistoricalData = (currency) => {
  const endPoint =
    "https://min-api.cryptocompare.com/data/v2/histoday?" +
    queryString.stringify({
      fsym: String(currency),
      tsym: "USD",
      limit: 2000,
      api_key: process.env.API_KEY,
    });
  return axios({
    method: "get",
    url: endPoint,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

module.exports = BCHistoricalData;
