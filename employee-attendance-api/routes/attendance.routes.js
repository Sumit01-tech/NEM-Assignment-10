const express = require("express");
const router = express.Router();
const { markAttendance } = require("../controllers/attendance.controller");

router.post("/attendance", markAttendance);

module.exports = router;
