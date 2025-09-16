import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";  // ✅ new admin login page
import ItemsControl from "./pages/ItemsControl";
import ListItems from "./pages/ListItems";

import AdminHome from "./pages/AdminHome";
import AdminLayout from "./pages/AdminLayout";
import UsersInfo from "./pages/UsersInfo";
import ToggleItem from "./pages/ToggleItems";

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  return (
    <Router>
      {/* ✅ Show Navbar only for users (not admin) */}
      {!admin && <Navbar user={user} setUser={setUser} />}

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            !user && !admin ? (
              <Signup setUser={setUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !user && !admin ? (
              <Login setUser={setUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/items"
          element={user ? <ItemsControl /> : <Navigate to="/login" />}
        />
        <Route
          path="/list"
          element={user ? <ListItems /> : <Navigate to="/login" />}
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/login"
          element={ !admin ? (
              <AdminLogin setAdmin={setAdmin} />
            ) : (
              <Navigate to="/admin/dashboard" />
            )
          }
        />
        <Route
          path="/admin"
          element={admin ? <AdminHome /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/dashboard"
          element={admin ? <AdminLayout /> : <Navigate to="/admin/login" />}
        >
          <Route index element={<UsersInfo />} />
          <Route path="toggle-item" element={<ToggleItem />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
