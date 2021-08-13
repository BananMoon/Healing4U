const express = require("express");
const router = express.Router();
const user = require("./user");

router.use("/users", user); // api/users

module.exports = router;
