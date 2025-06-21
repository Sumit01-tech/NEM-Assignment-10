const express = require("express");
const app = express();
const connectDB = require("./config/db");

const attendanceRoutes = require("./routes/attendance.routes");
const analyticsRoutes = require("./routes/analytics.routes");

app.use(express.json());

app.use("/", attendanceRoutes);
app.use("/", analyticsRoutes);

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
