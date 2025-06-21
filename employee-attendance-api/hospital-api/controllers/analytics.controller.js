const Appointment = require("../models/appointment.model");
const mongoose = require("mongoose");

exports.doctorsWithAppointments = async (req, res) => {
    try {
        const data = await Appointment.aggregate([
            { $group: { _id: "$doctorId", count: { $sum: 1 } } },
            {
                $lookup: {
                    from: "doctors",
                    localField: "_id",
                    foreignField: "_id",
                    as: "doctor"
                }
            },
            { $unwind: "$doctor" },
            { $project: { _id: 0, doctor: "$doctor.name", appointments: "$count" } }
        ]);
        res.status(200).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.patientMedicalHistory = async (req, res) => {
    try {
        const patientId = new mongoose.Types.ObjectId(req.params.id);
        const result = await Appointment.aggregate([
            { $match: { patientId } },
            {
                $lookup: {
                    from: "doctors",
                    localField: "doctorId",
                    foreignField: "_id",
                    as: "doctor"
                }
            },
            { $unwind: "$doctor" },
            {
                $project: {
                    appointmentDate: 1,
                    status: 1,
                    doctor: "$doctor.name"
                }
            }
        ]);
        res.status(200).json(result.length ? result : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.topSpecialties = async (req, res) => {
    try {
        const data = await Appointment.aggregate([
            {
                $lookup: {
                    from: "doctors",
                    localField: "doctorId",
                    foreignField: "_id",
                    as: "doctor"
                }
            },
            { $unwind: "$doctor" },
            {
                $group: {
                    _id: "$doctor.specialty",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 3 }
        ]);
        res.status(200).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.cancelledAppointments = async (req, res) => {
    try {
        const totalAppointments = await Appointment.aggregate([
            {
                $group: {
                    _id: "$doctorId",
                    total: { $sum: 1 },
                    cancelled: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0]
                        }
                    }
                }
            },
            {
                $project: {
                    percentage: { $multiply: [{ $divide: ["$cancelled", "$total"] }, 100] }
                }
            }
        ]);
        res.status(200).json(totalAppointments.length ? totalAppointments : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.monthlyAppointments = async (req, res) => {
    try {
        const result = await Appointment.aggregate([
            {
                $group: {
                    _id: { $month: "$appointmentDate" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);
        res.status(200).json(result.length ? result : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.activePatients = async (req, res) => {
    try {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const result = await Appointment.aggregate([
            { $match: { appointmentDate: { $gte: sixMonthsAgo } } },
            { $group: { _id: "$patientId", count: { $sum: 1 } } },
            { $match: { count: { $gt: 3 } } }
        ]);
        res.status(200).json(result.length ? result : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.doctorAvailability = async (req, res) => {
    try {
        const result = await mongoose.model("Doctor").aggregate([
            { $unwind: "$availability" },
            { $match: { availability: req.params.day } },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    specialty: 1,
                    availableDay: "$availability"
                }
            }
        ]);
        res.status(200).json(result.length ? result : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};
