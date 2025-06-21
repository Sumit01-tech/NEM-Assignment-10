const express = require("express");
const router = express.Router();
const { createLoan } = require("../controllers/loan.controller");

router.post("/loans", createLoan);

module.exports = router;
