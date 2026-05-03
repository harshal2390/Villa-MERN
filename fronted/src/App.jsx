import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddVilla from "./components/AddVilla";
import EditVilla from "./components/EditVilla";
import ProtectedRoute from "./routes/ProtectedRoute";
import VillaDetails from "./components/VillaDetails";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add" element={<AddVilla />} />
        <Route path="/edit/:id" element={<EditVilla />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/villa/:id" element={<VillaDetails />} />
      </Routes>
    </div>
  );
}
