const cryptoApi = require("../api/cryptoApi");
const dbModel = require("../../database/models/cryptoModel");
const obtainHighestValue = require("../helper/obtainHighestValue.js");

const getCryptoData = (req, res) => {
  const currency = req.query.currency;
  dbModel
    .getUpdateTime(currency)
    .then((time) => {
      console.log("==>Getting Time");
      console.log(time);
      const differenceInHours = (new Date().getTime() - time) / 1000 / 60 / 60;
      if (differenceInHours < 24) {
        console.log(`==>Retrieving data for ${currency} from database`);
        return dbModel.getCryptocurrencyData(currency).then((data) => {
          res.send(data);
        });
      } else {
        console.log(`==>Updating ${currency} database and retrieving new data`);
        return cryptoApi(currency)
          .then(({ data }) => {
            console.log(
              "===>Updating database with new ",
              currency,
              " data from API"
            );
            return dbModel.updateDatabase(data.Data.Data, currency);
          })
          .then(() => {
            console.log("===>Getting data from database");
            return dbModel.getCryptocurrencyData(currency);
          })
          .then((data) => {
            res.send(data);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const computeHighs = (req, res) => {
  const currency = req.query.currency;
  dbModel
    .getCryptocurrencyData(currency)
    .then((data) => {
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      const oneMonth = 30 * 7 * 24 * 60 * 60 * 1000;
      const oneYr = 365 * 24 * 60 * 60 * 1000;
      res.json({
        week: obtainHighestValue(data, oneWeek),
        month: obtainHighestValue(data, oneMonth),
        year: obtainHighestValue(data, oneYr),
      });
    })
    .catch((err) => {
      console.log("***Error at computing high values");
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getCryptoData,
  computeHighs,
};
