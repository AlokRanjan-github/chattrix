import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";

const HomeWithLayout = lazy(() => import("./pages/Home")); 
const ChatWithLayout = lazy(() => import("./pages/Chat"));
const Login = lazy(() => import("./pages/Login"));
const Groups = lazy(() => import("./pages/Groups"));
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
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
