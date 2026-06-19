const express = require("express");
const router = express.Router();

const {
  createInvestment,
  getMyInvestments,
} = require("../controllers/investmentController");

const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createInvestment);
router.get("/my-investments", protect, getMyInvestments);

module.exports = router;