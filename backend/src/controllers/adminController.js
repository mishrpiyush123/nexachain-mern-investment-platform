const Withdrawal = require("../models/Withdrawal");

// Admin Dashboard
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalWithdrawals = await Withdrawal.countDocuments();

    const pendingWithdrawals = await Withdrawal.countDocuments({
      status: "Pending",
    });

    const approvedWithdrawals = await Withdrawal.countDocuments({
      status: "Approved",
    });

    const rejectedWithdrawals = await Withdrawal.countDocuments({
      status: "Rejected",
    });

    res.status(200).json({
      success: true,
      data: {
        totalWithdrawals,
        pendingWithdrawals,
        approvedWithdrawals,
        rejectedWithdrawals,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Withdrawals
exports.getAllWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

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

// Approve Withdrawal
exports.approveWithdrawal = async (req, res) => {
  try {
    const withdrawal = await Withdrawal.findById(req.params.id);

    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: "Withdrawal not found",
      });
    }

    withdrawal.status = "Approved";
    await withdrawal.save();

    res.status(200).json({
      success: true,
      message: "Withdrawal approved",
      withdrawal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject Withdrawal
exports.rejectWithdrawal = async (req, res) => {
  try {
    const withdrawal = await Withdrawal.findById(req.params.id);

    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: "Withdrawal not found",
      });
    }

    withdrawal.status = "Rejected";
    await withdrawal.save();

    res.status(200).json({
      success: true,
      message: "Withdrawal rejected",
      withdrawal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};