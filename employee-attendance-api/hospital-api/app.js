const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

const appointmentRoutes = require("./routes/appointment.routes");
const analyticsRoutes = require("./routes/analytics.routes");

app.use("/", appointmentRoutes);
app.use("/", analyticsRoutes);

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server Started"));
