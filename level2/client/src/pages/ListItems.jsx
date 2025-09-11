import { useEffect, useState } from "react";
import API from "../api/api";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";




export default function ListItems() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "" });

  const fetchItems = async () => {
    try{
     const res = await axios.get("http://localhost:5000/api/items",{ withCredentials: true });
      setItems(res.data.items);
    }
    catch{
        console.error(err);
    }
    
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Start editing an item
  const startEdit = (item) => {
    setEditingId(item._id);
    setEditForm({ name: item.name, price: item.price });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", price: "" });
  };

  // Save updated item
  const saveEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/items/${id}`,
        { name: editForm.name, price: Number(editForm.price) },
        { withCredentials: true }
      );
      toast.success("Item updated ✏️");
      setEditingId(null);
      setEditForm({ name: "", price: "" });
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update item");
    }
  };
  // Delete an item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`, { withCredentials: true });
      toast.success("Item deleted 🗑️");
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete item");
    }
  };

  return (
    <div className="p-6">
        <Toaster position="top-center" />
      <h2 className="text-2xl font-bold mb-4">All Items</h2>
      <ul className="space-y-2">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item._id} className="border p-3 flex justify-between items-center">
              {editingId === item._id ? (
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="border p-1 rounded flex-1"
                  />
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="border p-1 rounded w-20"
                  />
                </div>
              ) : (
                <span>
                  {item.name} - ${item.price}
                </span>
              )}

              <div className="space-x-2">
                {editingId === item._id ? (
                  <>
                    <button
                      onClick={() => saveEdit(item._id)}
                      className="bg-green-500 px-2 py-1 rounded text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 px-2 py-1 rounded text-white"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(item)}
                      className="bg-yellow-500 px-2 py-1 rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="bg-red-500 px-2 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </ul>
    </div>
  );
}
