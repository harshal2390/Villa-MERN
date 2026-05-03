import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function VillaDetails() {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const fetchVilla = async () => {
      try {
        const res = await API.get(`/villas/${id}`, {
          headers: { Authorization: token },
        });

        setVilla(res.data);
      } catch (err) {
        setError("Failed to load villa");
      } finally {
        setLoading(false);
      }
    };

    fetchVilla();
  }, [id, token]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/villas/${id}`, {
        headers: { Authorization: token },
      });

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  if (error) return <p className="p-6 text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={villa.image || "https://via.placeholder.com/800"}
        alt={villa.title}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold">{villa.title}</h1>
      <p className="text-gray-500">{villa.location}</p>
      <p className="text-xl text-blue-600">₹ {villa.price}</p>

      <p className="mt-4">{villa.description}</p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(`/edit/${villa._id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
