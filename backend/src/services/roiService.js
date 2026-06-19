const Investment = require("../models/Investment");
const User = require("../models/User");
const ROIHistory = require("../models/ROIHistory");

const getTodayDateOnly = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const distributeROI = async () => {
  try {
    const today = getTodayDateOnly();

    const activeInvestments = await Investment.find({
      status: "Active",
      endDate: { $gte: today },
    });

    for (const investment of activeInvestments) {
      const alreadyPaid = await ROIHistory.findOne({
        investment: investment._id,
        roiDate: today,
      });

      if (alreadyPaid) {
        continue;
      }

      const roiAmount =
        (investment.investmentAmount * investment.dailyRoiPercentage) / 100;

      await User.findByIdAndUpdate(investment.user, {
        $inc: {
          walletBalance: roiAmount,
          totalRoiEarned: roiAmount,
        },
      });

      await ROIHistory.create({
        user: investment.user,
        investment: investment._id,
        roiAmount,
        roiDate: today,
      });
    }

    await Investment.updateMany(
      {
        status: "Active",
        endDate: { $lt: today },
      },
      {
        status: "Completed",
      }
    );

    console.log("ROI Distributed Successfully");
  } catch (error) {
    console.log("ROI Distribution Error:", error.message);
  }
};

module.exports = {
  distributeROI,
};