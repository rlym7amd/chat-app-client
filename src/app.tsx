import { BrowserRouter as Router, Route, Routes } from "react-router";
import Register from "./pages/register";
import Login from "./pages/login";
import AuthLayout from "./pages/auth-layout";
import Conversation from "./pages/conversation";
import SideBar from "./pages/sidebar";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<SideBar />}>
          <Route
            path="/conversations/:conversationId"
            element={<Conversation />}
          />
          <Route
            path="/"
            element={<div className="p-4">Please, select a conversation</div>}
          />
        </Route>
      </Routes>
    </Router>
  );
}
