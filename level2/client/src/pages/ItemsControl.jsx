import { useEffect, useState } from "react";

import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import { AuthContext } from "../contexts/AuthContext.jsx";


export default function ItemsControl() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });

  const fetchItems = async () => {
    try{
      const res = await axios.get("http://localhost:5000/api/items",{ withCredentials: true });
    setItems(res.data.items);
    }
    catch{
      toast.error("Failed to fetch items");
    }
    
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    try{
       await axios.post("http://localhost:5000/api/items", form,{ withCredentials: true });
    setForm({ name: "", price: "" });
    fetchItems();
    toast.success("Item Added");
    }
    catch{
      toast.error(err.response?.data?.message || "Failed to add item");
    }
   
  };

  const deleteItem = async (id) => {
    try{
      await axios.delete(`http://localhost:5000/api/items/${id}`,{ withCredentials: true });
    fetchItems();
    toast.success("Item Deleted");
    }
    catch{
       toast.error(err.response?.data?.message || "Failed to delete item");
    }
    
  };

  const updateItem = async (id) => {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    try{
       await axios.put(`http://localhost:5000/api/items/${id}`, { name: newName },{ withCredentials: true });
       toast.success("Item updated ✏️");
    fetchItems();
    }
    catch (err) {
      toast.error(err.response?.data?.message || "Failed to update item");
    }
    
  };

  return (
    <div className="p-6">
      <Toaster position="top-center" />
      <form onSubmit={addItem} className="space-x-2 mb-4">
        <input
          type="text"
          placeholder="Item Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-3 py-2 rounded">Add</button>
      </form>

      {/* <ul className="space-y-2">
        {items.map((item) => (
          <li key={item._id} className="border p-3 flex justify-between">
            <span>{item.name} - ${item.price}</span>
            <div className="space-x-2">
              <button onClick={() => updateItem(item._id)} className="bg-yellow-500 px-2 py-1 rounded text-white">Edit</button>
              <button onClick={() => deleteItem(item._id)} className="bg-red-500 px-2 py-1 rounded text-white">Delete</button>
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
