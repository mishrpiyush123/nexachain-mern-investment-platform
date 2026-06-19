import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    fetchAdminDashboard();
    fetchWithdrawals();
  }, []);

  const fetchAdminDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setDashboard(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const res = await api.get("/admin/withdrawals");
      setWithdrawals(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveWithdrawal = async (id) => {
    try {
      const res = await api.put(`/admin/withdraw/${id}/approve`);
      alert(res.data.message);
      fetchAdminDashboard();
      fetchWithdrawals();
    } catch (err) {
      alert(err.response?.data?.message || "Approve failed");
    }
  };

  const rejectWithdrawal = async (id) => {
    try {
      const res = await api.put(`/admin/withdraw/${id}/reject`);
      alert(res.data.message);
      fetchAdminDashboard();
      fetchWithdrawals();
    } catch (err) {
      alert(err.response?.data?.message || "Reject failed");
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {dashboard && (
        <div>
          <p>Total Withdrawals: {dashboard.totalWithdrawals}</p>
          <p>Pending Withdrawals: {dashboard.pendingWithdrawals}</p>
          <p>Approved Withdrawals: {dashboard.approvedWithdrawals}</p>
          <p>Rejected Withdrawals: {dashboard.rejectedWithdrawals}</p>
        </div>
      )}

      <h2>Withdrawal Requests</h2>

      {withdrawals.length > 0 ? (
        withdrawals.map((item) => (
          <div key={item._id}>
            <p>User: {item.user?.name || item.user?.email}</p>
            <p>Amount: {item.amount}</p>
            <p>Status: {item.status}</p>

            {item.status === "Pending" && (
              <>
                <button onClick={() => approveWithdrawal(item._id)}>
                  Approve
                </button>

                <button onClick={() => rejectWithdrawal(item._id)}>
                  Reject
                </button>
              </>
            )}

            <hr />
          </div>
        ))
      ) : (
        <p>No Withdrawal Requests Found</p>
      )}
    </div>
  );
}

export default AdminDashboard;