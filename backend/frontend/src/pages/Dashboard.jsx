import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FaWallet, FaChartLine, FaUsers, FaCoins } from "react-icons/fa";

import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [roiHistory, setRoiHistory] = useState([]);
  const [referralHistory, setReferralHistory] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [summaryRes, roiRes, referralRes, investmentRes] =
        await Promise.all([
          api.get("/dashboard/summary"),
          api.get("/dashboard/roi-history"),
          api.get("/dashboard/referral-history"),
          api.get("/dashboard/investments"),
        ]);

      setSummary(summaryRes.data);
      setRoiHistory(roiRes.data.data || []);
      setReferralHistory(referralRes.data.data || []);
      setInvestments(investmentRes.data.data || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const chartData = roiHistory.slice(-7).map((item) => ({
    date: new Date(item.roiDate).toLocaleDateString(),
    roi: item.roiAmount,
  }));

  if (loading) {
    return <p className="loading">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="dashboard-page">
          <h1>User Dashboard</h1>

          <div className="stats-grid">
            <StatCard
              title="Wallet Balance"
              value={`₹${summary?.walletBalance || 0}`}
              icon={<FaWallet />}
            />

            <StatCard
              title="Total ROI Earned"
              value={`₹${summary?.totalRoiEarned || 0}`}
              icon={<FaChartLine />}
            />

            <StatCard
              title="Level Income"
              value={`₹${summary?.totalLevelIncomeEarned || 0}`}
              icon={<FaUsers />}
            />

            <StatCard
              title="Total Investments"
              value={investments.length}
              icon={<FaCoins />}
            />
          </div>

          <section className="panel">
            <h2>Last 7 Days ROI</h2>

            <div className="chart-box">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="roi" stroke="#d4af37" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="panel">
            <h2>Investment History</h2>

            {investments.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>ROI %</th>
                    <th>Status</th>
                    <th>Start Date</th>
                  </tr>
                </thead>

                <tbody>
                  {investments.map((item) => (
                    <tr key={item._id}>
                      <td>₹{item.investmentAmount}</td>
                      <td>{item.dailyRoiPercentage}%</td>
                      <td>
                        <span className="badge active">{item.status}</span>
                      </td>
                      <td>{new Date(item.startDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Investments Found</p>
            )}
          </section>

          <section className="panel">
            <h2>ROI History</h2>

            {roiHistory.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ROI Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {roiHistory.slice(0, 10).map((item) => (
                    <tr key={item._id}>
                      <td>₹{item.roiAmount}</td>
                      <td>{new Date(item.roiDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No ROI History Found</p>
            )}
          </section>

          <section className="panel">
            <h2>Referral Income History</h2>

            {referralHistory.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Income</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {referralHistory.map((item) => (
                    <tr key={item._id}>
                      <td>Level {item.referralLevel}</td>
                      <td>₹{item.incomeAmount}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Referral Income Found</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;