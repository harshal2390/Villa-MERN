import { useNavigate } from "react-router-dom";

export default function VillaCard({ villa }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/villa/${villa._id}`)}
      className="bg-white rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition duration-300 cursor-pointer overflow-hidden"
    >
      <img
        src={villa.image || "https://via.placeholder.com/400"}
        alt={villa.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold truncate">{villa.title}</h2>

        <p className="text-gray-500">{villa.location}</p>

        <p className="text-blue-600 font-semibold">
          ₹ {villa.price?.toLocaleString()}
        </p>

        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {villa.description}
        </p>
      </div>
    </div>
  );
}
