const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  requestWithdrawal,
  getWithdrawalHistory,
} = require("../controllers/withdrawController");

router.post("/request", protect, requestWithdrawal);
router.get("/history", protect, getWithdrawalHistory);

module.exports = router;