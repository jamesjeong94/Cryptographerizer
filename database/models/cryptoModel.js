const Promise = require("bluebird");
const client = Promise.promisifyAll(require("../index"));

const currencyDatabases = {
  BTC: 0,
  ETH: 1,
  XRP: 2,
  USDT: 3,
  LTC: 4,
  UpdatedTime: 10,
};

const getUpdateTime = (currency) => {
  return client.selectAsync(currencyDatabases.UpdatedTime).then(() => {
    return client.getAsync(currency);
  });
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

const updateDatabase = (data, currency) => {
  console.log("===>Updating database", currency);
  console.log("====>With sample data: ", data[0]);
  return updateTime(currency)
    .then(() => {
      return client.selectAsync(currencyDatabases[currency]);
    })
    .then(() => {
      return data.map((row) => {
        return client.setAsync(
          (row.time * 1000).toString(),
          JSON.stringify(row)
        );
      });
    })
    .catch((err) => {
      console.log("***Err at updating database");
      console.log(err);
    });
};

const updateTime = (currency) => {
  return client.selectAsync(currencyDatabases.UpdatedTime).then(() => {
    return client.set(currency, new Date().getTime());
  });
};

module.exports = {
  getUpdateTime,
  getCryptocurrencyData,
  updateDatabase,
};
