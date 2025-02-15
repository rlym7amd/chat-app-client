import { BrowserRouter as Router, Route, Routes } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthLayout from "./components/AuthLayout";
import Conversation from "./pages/Conversation";
import Layout from "./components/SidebarLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<div className="p-4">Please, select a conversation</div>}
          />
          <Route
            path="/conversations/:conversationId"
            element={<Conversation />}
          />
        </Route>
      </Routes>
    </Router>
  );
}
