const { login } = require("../controllers/adminAuth");
const express = require("express");
const router = express.Router();

router.route("/login").post(login);

module.exports = router;
