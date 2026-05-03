import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import VillaCard from "../components/VillaCard";

export default function Dashboard() {
  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;

    const fetchVillas = async () => {
      try {
        const res = await API.get("/villas", {
          headers: {
            Authorization: token,
          },
        });

        setVillas(res.data);
      } catch (err) {
        setError("Failed to fetch villas");
      } finally {
        setLoading(false);
      }
    };

    fetchVillas();
  }, [token]);

  if (loading) {
    return <div className="p-6 text-center text-lg">Loading villas...</div>;
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Villa Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/add")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Villa
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ERROR */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* EMPTY STATE */}
      {villas.length === 0 && (
        <p className="text-center text-gray-500">No villas found. Add one!</p>
      )}

      {/* VILLA LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {villas.map((villa) => (
          <VillaCard key={villa._id} villa={villa} />
        ))}
      </div>
    </div>
  );
}
