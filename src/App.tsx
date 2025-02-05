import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import AuthLayout from "./components/Auth-layout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}
