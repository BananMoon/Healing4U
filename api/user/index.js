const express = require("express");
const router = express.Router();
const userController = require("./user.ctrl");

router.post("", userController.userCreate);
router.get("/dbtest", userController.userList);
router.get("/:id", userController.userRead);
router.put("/:id", userController.userUpdate);
router.delete("/:id", userController.userDelete);

module.exports = router;
