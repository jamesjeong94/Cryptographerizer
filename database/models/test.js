const Promise = require("bluebird");
const client = Promise.promisifyAll(require("../index"));

const currencyDatabases = {
  BTC: 0,
  ETH: 1,
  XRP: 2,
  USDT: 3,
  LTC: 4,
};

const getCryptocurrencyData = (currency) => {
  const scanAsync = (cursor, pattern, returnSet) => {
    return client
      .scanAsync(cursor, "MATCH", "*", "COUNT", "100")
      .then((response) => {
        cursor = response[0];
        let keys = response[1];
        const data = keys.map((key, index) => {
          return client.getAsync(key).then((value) => {
            return { [key]: JSON.parse(value) };
          });
        });

        returnSet.push(...data);
        if (cursor === "0") {
          return Array.from(returnSet);
        } else {
          return scanAsync(cursor, pattern, returnSet);
        }
      })
      .catch((err) => {
        console.log("***Error at data retrieval from server");
        console.log(err);
      });
  };
  return client
    .selectAsync(currencyDatabases[currency])
    .then(() => {
      console.log(`Selected database for currency: ${currency}!`);
      return scanAsync("0", null, []);
    })
    .then((data) => {
      return Promise.all(data);
    })
    .then((data) => {
      return data.sort((a, b) => {
        return Object.keys(a)[0] - Object.keys(b)[0];
      });
    });
};


