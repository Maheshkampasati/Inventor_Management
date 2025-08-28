import React, { useState } from "react";

export default function ItemCard({ item, editable }) {
  const [stock, setStock] = useState(item.stock);

  const updateStock = async () => {
    await fetch(`/api/inventory/update/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock }),
    });
  };

  return (
    <div className={`item-card card ${stock <= item.reorderLevel ? "low-stock" : "healthy-stock"}`}>
      <span>{item.emoji} <b>{item.name}</b></span>
      <span>Stock: {stock}</span>
      {item.expiryDate && (
        <span style={{ color: "orange" }}>Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
      )}
      {editable && (
        <input
          type="number"
          value={stock}
          onChange={e => setStock(Number(e.target.value))}
          onBlur={updateStock}
        />
      )}
    </div>
  );
}
