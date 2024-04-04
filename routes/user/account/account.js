const registerUser = require("../../../controllers/user/account/registerUser");
const express = require("express");

const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
