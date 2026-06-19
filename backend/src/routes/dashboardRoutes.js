const express = require("express");
const router = express.Router();

const {
  getDashboardSummary,
  getROIHistory,
  getReferralHistory,
  getInvestments,
} = require("../controllers/dashboardController");

router.get("/summary", getDashboardSummary);
router.get("/roi-history", getROIHistory);
router.get("/referral-history", getReferralHistory);
router.get("/investments", getInvestments);


module.exports = router;