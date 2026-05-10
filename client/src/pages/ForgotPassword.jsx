import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForgotPasswordMutation } from "../services/api";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await forgotPassword({ email });

    if (res.error) {
      return toast.warning(res.error.data.message);
    }

    toast.success("OTP sent");
    setTimeout(() => {
      navigate("/reset-password", { state: { email } });
    }, 700);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 shadow rounded-xl"
      >
        <h2 className="text-2xl mb-4 text-center">Forgot Password</h2>

        <Input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" className="w-full mt-4">
          Send OTP
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
