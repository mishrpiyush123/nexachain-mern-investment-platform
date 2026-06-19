import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Investment from "./pages/Investment";
import Withdraw from "./pages/Withdraw";
import AdminDashboard from "./pages/AdminDashboard";
import Referrals from "./pages/Referrals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/referrals" element={<Referrals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;