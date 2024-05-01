const express = require("express");
const createCard = require("../../../controllers/user/cards/createCard");
const uploadCardImage = require("../../../controllers/user/cards/uploadCardImage");
const fileUpload = require("../../../middlewares/fileUpload");
const orderPayment = require("../../../controllers/orders/cardOrder");
const userCardList = require("../../../controllers/cards/userCardList");
const getSingleCardByid = require("../../../controllers/cards/getSingleCardByid");

const router = express.Router();

router.post("/create", orderPayment, createCard);
router.post("/image/upload", fileUpload().single("image"), uploadCardImage);
router.get("/list", userCardList);
router.get("/single/id", getSingleCardByid);
module.exports = router;
