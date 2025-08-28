import React, { useEffect, useState } from "react";
export default function Reports() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/inventory").then(res => res.json()).then(setItems);
  }, []);

  const exportCSV = () => {
    const csv = items.map(i =>
      `${i.name},${i.category},${i.stock},${i.reorderLevel},${i.expiryDate || ""}`
    ).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "inventory_report.csv"; a.click();
  };

  return (
    <div className="reports card">
      <h3>📊 Inventory Report</h3>
      <button onClick={exportCSV}>Export CSV</button>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Category</th><th>Stock</th><th>Reorder Level</th><th>Expiry</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i._id}>
              <td>{i.name}</td>
              <td>{i.category}</td>
              <td>{i.stock}</td>
              <td>{i.reorderLevel}</td>
              <td>{i.expiryDate ? new Date(i.expiryDate).toLocaleDateString() : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
