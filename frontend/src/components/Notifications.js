import React, { useEffect, useState } from "react";
export default function Notifications() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("/api/inventory").then(res => res.json()).then(items => {
      setAlerts(items.filter(i => i.stock <= i.reorderLevel)
        .map(i => `⚠️ ${i.name} dropped below reorder level (${i.stock})`));
      // Add expiry alerts as needed
    });
  }, []);

  return (
    <div className="notifications">
      {alerts.map((msg, idx) => (
        <div key={idx} className="alert">{msg}</div>
      ))}
    </div>
  );
}
