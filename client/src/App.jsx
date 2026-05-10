import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import OTPVerify from "./pages/OTPverify";
import Dashbord from "./pages/Dashbord";
import Layout from "./components/layout";
import ProjectDetiles from "./pages/ProjectDetiles";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verification" element={<OTPVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashbord />} />
          <Route path="/:slug" element={<ProjectDetiles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
