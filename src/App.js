import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import { useAuthorization } from "./hooks";
import { useEffect } from "react";

function App() {
  useAuthorization();

  return (
    <Routes>
      {/*<Route path="/" element={<Signup />} />*/}
      <Route path="/signup" element={<Signup />} />
      {/*<Route path="/signup-details" element={<Signup />} />*/}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transactions" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
