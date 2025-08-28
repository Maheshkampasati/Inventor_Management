import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

const categories = [
  { key: "all", label: "All", emoji: "🍽️" },
  { key: "cookie", label: "Cookies", emoji: "🍪" },
  { key: "icecream", label: "Ice Cream", emoji: "🍨" },
];

export default function InventoryTabs({ user }) {
  const [items, setItems] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    fetch("/api/inventory").then(res => res.json()).then(setItems);
  }, []);

  return (
    <div className="inventory-tabs card">
      <div className="tabs">
        {categories.map(cat => (
          <button key={cat.key} className="tab" onClick={() => setTab(cat.key)}>
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {items
          .filter(i => tab === "all" || i.category === tab)
          .map(item => (
            <ItemCard key={item._id} item={item} editable={user.role === "manager" || user.role === "staff"} />
          ))}
      </div>
    </div>
  );
}
