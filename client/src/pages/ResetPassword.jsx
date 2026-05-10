import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useResetPasswordMutation } from "../services/api";
import { useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await resetPassword(form);

    if (res.error) {
      return toast.warning(res.error.data.message);
    }

    toast.success("Password reset successful");
    navigate("/login");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <ToastContainer/>
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 shadow rounded-xl">
        <h2 className="text-2xl mb-4 text-center">Reset Password</h2>

        <Input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
        />

        <Input
          name="otp"
          onChange={handleChange}
          placeholder="OTP"
          className="w-full border p-2 rounded mb-3"
        />

        <Input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="New password"
          className="w-full border p-2 rounded mb-3"
        />

        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;