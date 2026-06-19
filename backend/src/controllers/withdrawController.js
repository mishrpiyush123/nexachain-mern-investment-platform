const User = require("../models/User");
const Withdrawal = require("../models/Withdrawal");

exports.requestWithdrawal = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const user = await User.findById(req.user._id);

    if (user.walletBalance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient wallet balance",
      });
    }

    user.walletBalance -= amount;
    await user.save();

    const withdrawal = await Withdrawal.create({
      user: req.user._id,
      amount,
    });

    res.status(201).json({
      success: true,
      message: "Withdrawal request created successfully",
      withdrawal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getWithdrawalHistory = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: withdrawals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};