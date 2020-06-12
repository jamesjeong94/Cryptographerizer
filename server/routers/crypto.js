const express = require("express");
const cryptoController = require("../controllers/cryptoController.js");

const router = express.Router();

router.get("/", cryptoController.getCryptoData);
router.get("/high", cryptoController.computeHighs);

module.exports = router;
