import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import Signupdetails from "./components/Signup/Signupdetails";
// import Mail from "./components/Signup/Mail";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signupdetails" element={<Signupdetails />} />
      {/* <Route path="/mail" element={<Mail />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
