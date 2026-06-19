
const User = require("../models/User");
const ROIHistory = require("../models/ROIHistory");
const ReferralIncome = require("../models/ReferralIncome");
const Investment = require("../models/Investment");

exports.getDashboardSummary = async (req, res) => {
  try {
    const user = await User.findOne();

    res.status(200).json({
      success: true,
      walletBalance: user.walletBalance,
      totalRoiEarned: user.totalRoiEarned,
      totalLevelIncomeEarned: user.totalLevelIncomeEarned,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getROIHistory = async (req, res) => {
  try {
    const history = await ROIHistory.find();

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getReferralHistory = async (req, res) => {
  try {
    const history = await ReferralIncome.find();

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find();

    res.status(200).json({
      success: true,
      data: investments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};