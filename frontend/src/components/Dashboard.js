import React, { useEffect, useState } from "react";
export default function Dashboard({ user }) {
  const [stats, setStats] = useState({ total: 0, lowStock: 0, expiring: 0 });

  useEffect(() => {
    fetch("/api/report/stats")
      .then(res => res.json())
      .then(setStats);
  }, []);

  return (
    <div className="dashboard card">
      <h2>Dashboard</h2>
      <div>
        <span>Total Items: {stats.total}</span> |{" "}
        <span style={{ color: "red" }}>Low Stock: {stats.lowStock}</span> |{" "}
        <span style={{ color: "orange" }}>Expiring Soon: {stats.expiring}</span>
      </div>
    </div>
  );
}
