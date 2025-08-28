import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import InventoryTabs from "./components/InventoryTabs";
import ReorderList from "./components/ReorderList";
import Notifications from "./components/Notifications";
import SmartPrompt from "./components/SmartPrompt";
import Reports from "./components/Reports";
import "./styles/theme.css";
import "./styles/dark.css";
import "./styles/light.css";

function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("light");

  if (!user) return <Login setUser={setUser} />;
  return (
    <div className={`App ${mode}`}>
      <button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
        {mode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
      <Notifications />
      <SmartPrompt user={user} />
      <Dashboard user={user} />
      <InventoryTabs user={user} />
      <ReorderList user={user} />
      <Reports user={user} />
    </div>
  );
}
export default App;
