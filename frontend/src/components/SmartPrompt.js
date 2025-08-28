import React, { useState } from "react";
export default function SmartPrompt({ user }) {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    // Example: check if we have enough milk for next week
    if (query.toLowerCase().includes("milk")) {
      const res = await fetch("/api/inventory");
      const items = await res.json();
      const milk = items.find(i => i.name.toLowerCase().includes("milk"));
      if (milk && milk.stock > milk.reorderLevel) {
        setAnswer(`✅ Yes, you have enough milk in stock (${milk.stock}).`);
      } else {
        setAnswer(`⚠️ Not enough milk! Current stock: ${milk ? milk.stock : 0}`);
      }
    } else {
      setAnswer("Sorry, I don't understand this prompt yet.");
    }
  };

  return (
    <div className="smart-prompt card">
      <input
        placeholder="Type a question (e.g. Do we have enough milk?)"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleAsk}>Ask</button>
      {answer && <div className="answer">{answer}</div>}
    </div>
  );
}
