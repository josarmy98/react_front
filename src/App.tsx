import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AutosList } from "./pages/AutosList";
import { AutoDetail } from "./pages/AutoDetail";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/autos" element={<AutosList />} />
          <Route path="/autos/:id" element={<AutoDetail />} />
          <Route path="/" element={<Navigate to="/autos" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
