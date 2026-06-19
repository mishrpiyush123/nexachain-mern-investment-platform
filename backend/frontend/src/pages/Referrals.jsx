import { useEffect, useState } from "react";
import axios from "axios";

function Referrals() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/referrals")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>My Referrals</h1>

      <h3>Referral Link</h3>
      <p>{data.referralLink}</p>

      <h3>Total Referrals</h3>
      <p>{data.totalReferrals}</p>

      <h3>Total Referral Income</h3>
      <p>₹{data.totalIncome}</p>
    </div>
  );
}

export default Referrals;