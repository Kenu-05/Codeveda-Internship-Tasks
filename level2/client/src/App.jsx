import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ItemsControl from "./pages/ItemsControl";
import ListItems from "./pages/ListItems";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/items" element={user ? <ItemsControl /> : <Navigate to="/login" />} />
        <Route path="/list" element={user ? <ListItems /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
