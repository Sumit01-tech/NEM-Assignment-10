const Appointment = require("../models/appointment.model");

exports.createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(200).json(appointment);
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};
