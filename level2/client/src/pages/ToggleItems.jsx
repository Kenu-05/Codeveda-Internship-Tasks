// pages/admin/ToggleItems.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// export default function ToggleItems() {
//   const [items, setItems] = useState([]);

//   const fetchItems = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/items", { withCredentials: true });
//       setItems(res.data.items);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to fetch items");
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const toggleInStock = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/admin/items/${id}/toggle`, {}, { withCredentials: true });
//       toast.success("Item stock status updated!");
//       fetchItems();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update item");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Toggle Items Stock</h2>
//       {items.length === 0 ? (
//         <p>No items found.</p>
//       ) : (
//         <ul className="space-y-2">
//           {items.map((item) => (
//             <li key={item._id} className="flex justify-between items-center border p-3 rounded bg-white">
//               <span>
//                 {item.name} - ${item.price} -{" "}
//                 <span className={item.inStock ? "text-green-600" : "text-red-600"}>
//                   {item.inStock ? "In Stock" : "Out of Stock"}
//                 </span>
//               </span>
//               <button
//                 onClick={() => toggleInStock(item._id)}
//                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//               >
//                 Toggle
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import axios from "axios";

export default function ToggleItems() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/items", { withCredentials: true }); // backend route
      setItems(data.items);
    } catch (err) {
      toast.error("Failed to fetch items");
    }
  };

  const toggleStock = async (id) => {
    try {
      const { data } = await  axios.put(`http://localhost:5000/api/admin/items/toggle/${id}`, {}, { withCredentials: true });
      toast.success("Item stock toggled");
      setItems((prev) =>
        prev.map((item) => (item._id === id ? data.item : item))
      );
    } catch (err) {
      toast.error("Failed to toggle stock");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Toggle Items Stock</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item._id} className="flex justify-between items-center border p-3 rounded">
            <span>{item.name} - ${item.price} - {item.inStock ? "In Stock" : "Out of Stock"}</span>
            <button
              onClick={() => toggleStock(item._id)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Toggle Stock
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
