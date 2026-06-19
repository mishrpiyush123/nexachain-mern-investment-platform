import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaWallet,
  FaUsers,
  FaMoneyBillWave,
  FaUserShield,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">NexaChain AI</h2>

      <nav>
        <Link to="/dashboard">
          <FaChartLine /> Dashboard
        </Link>

        <Link to="/investment">
          <FaMoneyBillWave /> Investments
        </Link>

        <Link to="/withdraw">
          <FaWallet /> Withdraw
        </Link>

        <Link to="/referrals">
          <FaUsers /> Referrals
        </Link>

        <Link to="/admin">
          <FaUserShield /> Admin
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;