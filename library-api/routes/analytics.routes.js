const express = require("express");
const router = express.Router();
const {
    borrowedBooks,
    topBorrowedBooks,
    borrowerHistory,
    frequentBorrowers,
    loanReports
} = require("../controllers/analytics.controller");

router.get("/analytics/borrowed-books", borrowedBooks);
router.get("/analytics/top-borrowed-books", topBorrowedBooks);
router.get("/analytics/borrower-history/:id", borrowerHistory);
router.get("/analytics/frequent-borrowers", frequentBorrowers);
router.get("/analytics/loan-reports", loanReports);

module.exports = router;
