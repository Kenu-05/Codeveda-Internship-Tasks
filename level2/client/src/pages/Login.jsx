import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", form);
      setUser(res.data.user); // user comes from backend
      navigate("/items");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold">Login</h2>

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

        <button className="bg-green-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
