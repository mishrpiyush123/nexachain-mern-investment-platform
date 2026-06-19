const Investment = require("../models/Investment");
const { distributeReferralIncome } = require("../services/referralService");
const plans = {
  Basic: { amount: 1000, roi: 1, days: 30 },
  Premium: { amount: 5000, roi: 1.5, days: 60 },
  Elite: { amount: 10000, roi: 2, days: 90 },
};

const createInvestment = async (req, res) => {
  try {
    const { planName } = req.body;

    if (!planName || !plans[planName]) {
      return res.status(400).json({
        success: false,
        message: "Invalid planName. Use Basic, Premium, or Elite",
      });
    }

    const selectedPlan = plans[planName];

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + selectedPlan.days);

    const investment = await Investment.create({
      user: req.user._id,
      investmentAmount: selectedPlan.amount,
      planName,
      startDate,
      endDate,
      dailyRoiPercentage: selectedPlan.roi,
      status: "Active",
    });
    await distributeReferralIncome(
        req.user._id,
        selectedPlan.amount,
        investment._id,
        selectedPlan.amount,
        Investment._id
        );

    res.status(201).json({
      success: true,
      message: "Investment created successfully",
      investment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: investments.length,
      investments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInvestment,
  getMyInvestments,
};