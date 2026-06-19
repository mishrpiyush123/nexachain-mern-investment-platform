const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    totalReferrals: 5,
    totalIncome: 250,
    referralLink: "https://nexachain.com/ref/PIYUSH123",
  });
});

module.exports = router;