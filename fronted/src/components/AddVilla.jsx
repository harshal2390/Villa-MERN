import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function AddVilla() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  // ================= SUBMIT =================
  const onSubmit = async (data) => {
    try {
      await API.post("/villas", data, {
        headers: {
          Authorization: token,
        },
      });

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Villa</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            placeholder="Title"
            {...register("title")}
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            placeholder="Price"
            {...register("price")}
            className="w-full p-2 border rounded"
          />

          <input
            placeholder="Location"
            {...register("location")}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Image URL"
            {...register("image")}
            className="w-full p-2 border rounded"
          />

          <input
            placeholder="Description"
            {...register("description")}
            className="w-full p-2 border rounded"
          />

          <button className="w-full bg-green-500 text-white p-2 rounded">
            Add Villa
          </button>
        </form>
      </div>
    </div>
  );
}
