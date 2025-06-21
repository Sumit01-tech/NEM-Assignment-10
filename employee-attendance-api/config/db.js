const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/attendanceDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Connection failed", error);
        process.exit(1);
    }
};

module.exports = connectDB;
