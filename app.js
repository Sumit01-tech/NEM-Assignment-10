const express = require("express");
const app = express();
const connectDB = require("./config/db");

app.use(express.json());

const loanRoutes = require("./routes/loan.routes");
const analyticsRoutes = require("./routes/analytics.routes");

app.use("/", loanRoutes);
app.use("/", analyticsRoutes);

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server Started");
});
