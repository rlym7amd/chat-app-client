import { BrowserRouter as Router, Route, Routes } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";
import AuthLayout from "./components/Auth-layout";
import Conversation from "./components/Conversation";
import SideBar from "./components/Sidebar";

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
