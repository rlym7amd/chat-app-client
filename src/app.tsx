import { BrowserRouter as Router, Route, Routes } from "react-router";
import Register from "./pages/register";
import Login from "./pages/login";
import AuthLayout from "./layouts/auth-layout";
import Conversation from "./pages/conversation";
import Layout from "./layouts/layout";

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
