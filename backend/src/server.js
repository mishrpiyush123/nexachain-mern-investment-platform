const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

require("./cron/roiCron");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

console.log("MONGO_URI =", process.env.MONGO_URI);

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/investment", require("./routes/investmentRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/withdraw", require("./routes/withdrawRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/referrals", require("./routes/referralRoutes"));

// Root Route
app.get("/", (req, res) => {
  res.send("Nexachain API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});