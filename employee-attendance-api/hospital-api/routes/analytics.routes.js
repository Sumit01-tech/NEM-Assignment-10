const express = require("express");
const router = express.Router();
const {
    doctorsWithAppointments,
    patientMedicalHistory,
    topSpecialties,
    cancelledAppointments,
    monthlyAppointments,
    activePatients,
    doctorAvailability
} = require("../controllers/analytics.controller");

router.get("/analytics/doctors-with-appointments", doctorsWithAppointments);
router.get("/analytics/patient-medical-history/:id", patientMedicalHistory);
router.get("/analytics/top-specialties", topSpecialties);
router.get("/analytics/cancelled-appointments", cancelledAppointments);
router.get("/analytics/monthly-appointments", monthlyAppointments);
router.get("/analytics/active-patients", activePatients);
router.get("/analytics/doctor-availability/:day", doctorAvailability);

module.exports = router;
