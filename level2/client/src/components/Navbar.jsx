// import { Link } from "react-router-dom";
// import "./../styles/main.css";

// export default function Navbar({ user, onLogout }) {
//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//         <Link to="/" className="logo">Codeveda</Link>
//         <Link to="/">Home</Link>
//         {user && <Link to="/dashboard">Dashboard</Link>}
//         {user && <Link to="/items">Items</Link>}
//       </div>
//       <div className="nav-right">
//         {!user ? (
//           <>
//             <Link to="/login" className="btn-nav">Login</Link>
//             <Link to="/signup" className="btn-nav">Signup</Link>
//           </>
//         ) : (
//           <button onClick={onLogout} className="btn-nav">Logout</button>
//         )}
//       </div>
//     </nav>
//   );
// }

// src/components/Navbar.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Navbar({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/logout", {withCredentials: true,});

      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 md:py-4 shadow max-w-5xl rounded-full mx-auto w-full bg-white">
      {/* Logo */}
      <NavLink to="/">
        <img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/prebuiltuiDummyLogo.svg"
          alt="Logo"
          className="h-8"
        />
      </NavLink>

      {/* Menu (Desktop + Mobile) */}
      <nav
        className={`${
          open ? "max-md:w-full" : "max-md:w-0"
        } max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden 
        items-center justify-center max-md:h-full 
        transition-[width] bg-white/90 backdrop-blur 
        flex-col md:flex-row flex gap-8 text-gray-900 text-sm font-normal`}
      >
        <NavLink className="hover:text-indigo-600" to="/">
          Home
        </NavLink>
        <NavLink className="hover:text-indigo-600" to="/items">
          Items Control
        </NavLink>
        <NavLink className="hover:text-indigo-600" to="/list">
          List Items
        </NavLink>
        

        {/* Close Menu (Mobile) */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Search Button */}
        <button className="size-8 flex items-center justify-center hover:bg-gray-100 transition border border-slate-300 rounded-md">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 10.39a2.889 2.889 0 1 0 0-5.779 2.889 2.889 0 0 0 0 5.778M7.5 1v.722m0 11.556V14M1 7.5h.722m11.556 0h.723m-1.904-4.596-.511.51m-8.172 8.171-.51.511m-.001-9.192.51.51m8.173 8.171.51.511"
              stroke="#353535"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Auth Buttons */}
        {!user ? (
          <div className="hidden md:flex gap-2">
    <NavLink
      to="/login"
      className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
    >
      Login
    </NavLink>
    <NavLink
      to="/signup"
      className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
    >
      Sign up
    </NavLink>
  </div>
        ) : (
          <button
            onClick={logout}
            className="hidden md:flex bg-red-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-600">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
