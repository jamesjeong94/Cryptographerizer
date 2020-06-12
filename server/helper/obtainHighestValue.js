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

module.exports = obtainHighestValue;
