import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function EditVilla() {
  const { register, handleSubmit, setValue } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchVilla = async () => {
      try {
        const res = await API.get(`/villas/${id}`, {
          headers: {
            Authorization: token,
          },
        });

        const villa = res.data;

        if (!villa) {
          setError("Villa not found");
          return;
        }

        // Prefill form
        setValue("title", villa.title);
        setValue("price", villa.price);
        setValue("location", villa.location);
        setValue("image", villa.image);
        setValue("description", villa.description);
      } catch (err) {
        setError("Failed to load villa");
      } finally {
        setLoading(false);
      }
    };

    fetchVilla();
  }, [id, token, setValue]);

  const onSubmit = async (data) => {
    try {
      await API.put(`/villas/${id}`, data, {
        headers: {
          Authorization: token,
        },
      });

      navigate(`/villa/${id}`);
    } catch (err) {
      setError("Update failed");
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-[400px]">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Villa</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("title")}
            placeholder="Title"
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            {...register("price")}
            placeholder="Price"
            className="w-full p-2 border rounded"
          />

          <input
            {...register("location")}
            placeholder="Location"
            className="w-full p-2 border rounded"
          />

          <input
            {...register("image")}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
          />

          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />

          <button className="w-full bg-blue-500 text-white p-2 rounded">
            Update Villa
          </button>
        </form>
      </div>
    </div>
  );
}
