const express = require("express");
const router = express.Router();

const {
  getAdminDashboard,
  getAllWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
} = require("../controllers/adminController");

router.get("/dashboard", getAdminDashboard);
router.get("/withdrawals", getAllWithdrawals);
router.put("/withdraw/:id/approve", approveWithdrawal);
router.put("/withdraw/:id/reject", rejectWithdrawal);

module.exports = router;