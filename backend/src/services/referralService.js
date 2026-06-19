const User = require("../models/User");
const ReferralIncome = require("../models/ReferralIncome");

const levelPercentages = [
  { level: 1, percent: 5 },
  { level: 2, percent: 3 },
  { level: 3, percent: 1 },
];

const distributeReferralIncome = async (
  investorUserId,
  investmentAmount,
  investmentId
) => {
  let currentUser = await User.findById(investorUserId);

  for (const item of levelPercentages) {
    if (!currentUser || !currentUser.referredBy) {
      break;
    }

    const parentUser = await User.findById(currentUser.referredBy);

    if (!parentUser) {
      break;
    }

    const incomeAmount = (investmentAmount * item.percent) / 100;

    await ReferralIncome.create({
      receiverUser: parentUser._id,
      sourceUser: investorUserId,
      investment: investmentId,
      referralLevel: item.level,
      incomeAmount,
    });

    parentUser.walletBalance += incomeAmount;
    parentUser.totalLevelIncomeEarned += incomeAmount;

    await parentUser.save();

    currentUser = parentUser;
  }
};

module.exports = {
  distributeReferralIncome,
};