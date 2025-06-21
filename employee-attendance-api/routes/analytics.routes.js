const express = require("express");
const router = express.Router();
const {
    totalAttendance,
    attendanceHistory,
    topAttendees,
    absentEmployees,
    recentAttendance
} = require("../controllers/analytics.controller");

router.get("/analytics/total-attendance", totalAttendance);
router.get("/analytics/attendance-history/:id", attendanceHistory);
router.get("/analytics/top-attendees", topAttendees);
router.get("/analytics/absent-employees", absentEmployees);
router.get("/analytics/recent-attendance", recentAttendance);

module.exports = router;
