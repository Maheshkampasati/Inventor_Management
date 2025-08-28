import React, { useEffect, useState } from "react";

export default function ReorderList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/inventory").then(res => res.json()).then(data => {
      setItems(data.filter(i => i.stock <= i.reorderLevel));
    });
  }, []);

  const exportCSV = () => {
    const csv = items.map(i => `${i.name},${i.stock}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "reorder_list.csv"; a.click();
  };

  return (
    <div className="reorder-list card">
      <h3>🛒 Reorder List</h3>
      <ul>
        {items.map(i => (
          <li key={i._id} style={{ color: "red" }}>
            {i.emoji} {i.name}: {i.stock}
          </li>
        ))}
      </ul>
      <button onClick={exportCSV}>Export CSV</button>
    </div>
  );
}
