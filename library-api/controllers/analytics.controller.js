const Loan = require("../models/loan.model");
const mongoose = require("mongoose");

exports.borrowedBooks = async (req, res) => {
    try {
        const result = await Loan.aggregate([
            {
                $group: {
                    _id: "$borrowerId",
                    borrowedBooks: { $addToSet: "$bookId" }
                }
            }
        ]);
        if (result.length === 0) return res.status(200).json({ message: "No data found" });
        res.status(200).json(result);
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.topBorrowedBooks = async (req, res) => {
    try {
        const result = await Loan.aggregate([
            {
                $group: {
                    _id: "$bookId",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 3 }
        ]);
        if (result.length === 0) return res.status(200).json({ message: "No data found" });
        res.status(200).json(result);
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.borrowerHistory = async (req, res) => {
    try {
        const borrowerId = new mongoose.Types.ObjectId(req.params.id);
        const result = await Loan.aggregate([
            { $match: { borrowerId } },
            {
                $lookup: {
                    from: "books",
                    localField: "bookId",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            }
        ]);
        if (result.length === 0) return res.status(200).json({ message: "No data found" });
        res.status(200).json(result);
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.frequentBorrowers = async (req, res) => {
    try {
        const result = await Loan.aggregate([
            {
                $group: {
                    _id: "$borrowerId",
                    totalLoans: { $sum: 1 }
                }
            },
            { $match: { totalLoans: { $gt: 5 } } }
        ]);
        if (result.length === 0) return res.status(200).json({ message: "No data found" });
        res.status(200).json(result);
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.loanReports = async (req, res) => {
    try {
        const result = await Loan.aggregate([
            {
                $lookup: {
                    from: "books",
                    localField: "bookId",
                    foreignField: "_id",
                    as: "book"
                }
            },
            {
                $lookup: {
                    from: "borrowers",
                    localField: "borrowerId",
                    foreignField: "_id",
                    as: "borrower"
                }
            }
        ]);
        if (result.length === 0) return res.status(200).json({ message: "No data found" });
        res.status(200).json(result);
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};
