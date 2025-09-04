import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";

const HomeWithLayout = lazy(() => import("./pages/Home")); 
const ChatWithLayout = lazy(() => import("./pages/Chat"));
const Login = lazy(() => import("./pages/Login"));
const Groups = lazy(() => import("./pages/Groups"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));

const NotFound = lazy(() => import("./pages/NotFound"));


const user = true;

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div><LayoutLoader /></div>}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<HomeWithLayout />} /> 
            <Route path="/chat/:chatId" element={<ChatWithLayout />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

           <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          
          <Route path="*" element={<NotFound />} />
          
          
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
