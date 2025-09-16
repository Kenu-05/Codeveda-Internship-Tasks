import { useEffect, useState } from "react";
import { toast,Toaster } from "react-hot-toast";
import axios from "axios";

export default function UsersInfo() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/users",{withCredentials: true, });  // ✅ send cookie if backend uses cookies});
      setUsers(data.users);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Toaster position="top-center" />
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user._id} className="border p-3 rounded flex justify-between">
            <span>{user.name} ({user.email})</span>
            <span>Role: {user.role || "user"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
