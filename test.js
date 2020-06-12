const dbModel = require("./database/models/cryptoModel.js");

const computeHighs = (req, res) => {
  const currency = req.query.currency;
  dbModel.getCryptocurrencyData(currency).then((data) => {
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const oneMonth = 30 * 7 * 24 * 60 * 60 * 1000;
    const oneYr = 365 * 7 * 24 * 60 * 60 * 1000;
    console.log({
      week: obtainHighestValue(data, oneWeek),
      month: obtainHighestValue(data, oneMonth),
      year: obtainHighestValue(data, oneYr),
    });
  });
};

const obtainHighestValue = (dataSet, timeFromNow) => {
  const timeRange = new Date().getTime() - timeFromNow;
  console.log(timeRange);
  const dataSetWithinTimeRange = dataSet.filter((data) => {
    let parsed = Object.values(data)[0];
    if (parsed.time * 1000 > timeRange) {
      return parsed;
    }
  });
  let highest = dataSetWithinTimeRange.reduce(
    (acc, curr) => {
      let parsed = Object.values(curr)[0];
      if (parsed.close > acc.close) {
        acc = parsed;
      }
      return acc;
    },
    { close: 0 }
  );
  return highest;
};
