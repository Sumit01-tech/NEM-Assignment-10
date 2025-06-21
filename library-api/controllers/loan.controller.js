const Loan = require("../models/loan.model");

exports.createLoan = async (req, res) => {
    try {
        const loan = await Loan.create(req.body);
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};
