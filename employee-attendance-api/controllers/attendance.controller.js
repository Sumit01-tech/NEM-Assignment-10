const Attendance = require("../models/attendance.model");

exports.markAttendance = async (req, res) => {
    try {
        const record = await Attendance.create(req.body);
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};
