import { useEffect, useState } from "react";
import api from "../services/api";

function Investment() {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
     const res = await api.get("/investment/my-investments");
      setInvestments(res.data.investments || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Investment Page</h1>

      {investments.length > 0 ? (
        investments.map((inv) => (
          <div key={inv._id}>
            <p>Amount: {inv.investmentAmount}</p>
            <p>Plan: {inv.planName}</p>
            <p>ROI: {inv.dailyRoiPercentage}%</p>
            <p>Status: {inv.status}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No Investments Found</p>
      )}
    </div>
  );
}

export default Investment;