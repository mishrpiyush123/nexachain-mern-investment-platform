const cron = require("node-cron");

console.log("ROI CRON FILE LOADED");

const { distributeROI } = require("../services/roiService");

cron.schedule("0 0y * * *", async () => {
  console.log("Running ROI Cron");
  await distributeROI();
});