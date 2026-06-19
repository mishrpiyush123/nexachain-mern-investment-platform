function Header() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="top-header">
      <div>
        <h2>Investment Platform</h2>
        <p>Welcome back to NexaChain AI</p>
      </div>

      <button onClick={logout}>Logout</button>
    </header>
  );
}

export default Header;