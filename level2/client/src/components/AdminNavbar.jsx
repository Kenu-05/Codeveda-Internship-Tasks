import { NavLink, useNavigate } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-hot-toast";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await API.post("/admin/logout");
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/login");
      }
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <span className="text-lg font-bold">Admin Panel</span>
      <div className="space-x-4">
        <NavLink to="/admin/dashboard" className="hover:text-gray-300">
          Dashboard
        </NavLink>
        <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </nav>
  );
}
