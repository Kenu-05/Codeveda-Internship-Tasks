import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function AdminLogin({ setAdmin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/admin/login", form,{withCredentials:true});

      if (data.success) {
        setAdmin(data.admin);
        toast.success("Admin logged in successfully");
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message || "Invalid admin credentials");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Admin Login
        </button>
      </form>
    </div>
  );
}
