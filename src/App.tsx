import { BrowserRouter as Router, Route, Routes } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthLayout from "./components/AuthLayout";
import Conversation from "./pages/Conversation";
import SidebarLayout from "./components/SidebarLayout";
import Friends from "./pages/Friends";
import PendingFriends from "./pages/PendingFriends";
import FriendsNav from "./components/FriendsNav";
import AddFriend from "./pages/AddFriend";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<SidebarLayout />}>
          <Route
            path="/"
            element={<div className="p-4">Please, select a conversation</div>}
          />
          <Route
            path="/conversations/:conversationId"
            element={<Conversation />}
          />
          <Route element={<FriendsNav />}>
            <Route path="friends" element={<Friends />} />
            <Route path="friends/pending" element={<PendingFriends />} />
            <Route path="friends/add" element={<AddFriend />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
