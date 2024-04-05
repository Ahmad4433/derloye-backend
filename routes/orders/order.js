const cardOrder = require("../../controllers/orders/cardOrder");
const express = require("express");

const router = express.Router();

router.post("/create", cardOrder);

module.exports = router;
