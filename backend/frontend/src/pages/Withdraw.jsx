import { useEffect, useState } from "react";
import api from "../services/api";

function Withdraw() {
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/withdraw/history");
      setHistory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleWithdraw = async () => {
    try {
      const res = await api.post("/withdraw/request", {
        amount: Number(amount),
      });

      alert(res.data.message);

      setAmount("");

      fetchHistory();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div>
      <h1>Withdraw Page</h1>

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleWithdraw}>
        Withdraw
      </button>

      <h2>Withdrawal History</h2>

      {history.length > 0 ? (
        history.map((item) => (
          <div key={item._id}>
            <p>Amount: {item.amount}</p>
            <p>Status: {item.status}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No Withdrawals Found</p>
      )}
    </div>
  );
}

export default Withdraw;