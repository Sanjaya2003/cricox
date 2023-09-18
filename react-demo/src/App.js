
import { useContext } from "react";
import Home from "./pages/home/home";
import Profile from "./pages/home/profile/profile";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import {
  BrowserRouter as Router, Routes


} from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  Route
} from "react-router-dom";
import { Authcontext } from "./context/Authcontext";

function App() {
  const { user }= useContext(Authcontext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register/>} />
        <Route path="/login" element={ user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={ user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App;
