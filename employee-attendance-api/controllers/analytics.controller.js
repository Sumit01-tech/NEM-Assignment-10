const Attendance = require("../models/attendance.model");
const Employee = require("../models/employee.model");
const mongoose = require("mongoose");

exports.totalAttendance = async (req, res) => {
    try {
        const result = await Attendance.aggregate([
            { $match: { status: "Present" } },
            {
                $group: {
                    _id: "$employeeId",
                    totalPresent: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(result.length ? result : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.attendanceHistory = async (req, res) => {
    try {
        const employeeId = new mongoose.Types.ObjectId(req.params.id);
        const result = await Attendance.find({ employeeId });
        res.status(200).json(result.length ? result : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.topAttendees = async (req, res) => {
    try {
        const totalDays = await Attendance.aggregate([
            { $group: { _id: "$employeeId", total: { $sum: 1 }, present: { $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] } } } },
            { $project: { percentage: { $multiply: [{ $divide: ["$present", "$total"] }, 100] } } },
            { $match: { percentage: { $gte: 95 } } }
        ]);
        res.status(200).json(totalDays.length ? totalDays : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.absentEmployees = async (req, res) => {
    try {
        const result = await Attendance.aggregate([
            { $match: { status: "Absent", date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } },
            {
                $group: {
                    _id: "$employeeId",
                    absentCount: { $sum: 1 }
                }
            },
            { $match: { absentCount: { $gt: 5 } } }
        ]);
        res.status(200).json(result.length ? result : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.recentAttendance = async (req, res) => {
    try {
        const result = await Attendance.aggregate([
            { $sort: { date: -1 } },
            {
                $group: {
                    _id: "$employeeId",
                    records: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    records: { $slice: ["$records", 5] }
                }
            }
        ]);
        res.status(200).json(result.length ? result : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};
