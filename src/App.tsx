import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import AuthLayout from "./components/Auth-layout";
import Conversation from "./components/Conversation";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/conversations/1" element={<Conversation />} />
      </Routes>
    </Router>
  );
}
