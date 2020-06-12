const redis = require("redis");
const client = redis.createClient();

client.on("error", () => {
  console.log("***ERROR: Connection to database");
});

client.on("connect", () => {
  console.log("==>Successfully connect to database!");
});

module.exports = client;
