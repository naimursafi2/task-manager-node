import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "../services/api";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Simple validation
  const validate = () => {
    const newErrors = {};

    if (!form.email.includes("@")) {
      newErrors.email = "Valid email is required";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    setErrors({});
    const res = await loginUser(form);
    if (res.error) {
      const field = res.error.data.field;
      if (field == "email") return setErrors({ email: res.error.data.message });
      if (field == "password")
        return setErrors({ password: res.error.data.message });
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      toast.success("Login Successful!");
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <ToastContainer />
      <div className="flex flex-col max-w-md mx-auto  p-6 shadow-lg rounded-2xl bg-white w-full">
        <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Login
          </Button>
          <p className=" text-right">
            Don't have an account{" "}
            <Link className="text-blue-900 font-bold" to="/registration">
              Registration
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
