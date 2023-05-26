import React, { useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import api from "../api";
import useAuth from "../hooks/useAuth";
import sleep from "../utils/sleep";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { user } = useAuth();

  if (user) {
    navigate("/");
  }

  const registerMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await api.post("/auth/register", {
          name: fullName,
          email,
          password,
        });
        return res.data;
      } catch (error) {
        toast.error("Failed to register");
      }
    },
    onSuccess: async () => {
      toast.success("Successfully registered");
      await sleep(1000);
      navigate("/login");
    },
    onError: async () => {
      toast.error("Failed to register");
      await sleep(1000);
      toast.remove();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errors = 0;

    if (!fullName && !email && !password && !confirmPassword) {
      toast.error("Please fill in all fields");
      errors++;
    }

    if (fullName.length < 3) {
      toast.error("Full name must be at least 3 characters long");
      errors++;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      errors++;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      errors++;
    }

    if (password !== confirmPassword) {
      toast.error("passwords do not match");
      errors++;
    }

    if (errors === 0) {
      registerMutation.mutate();
    }
  };

  return (
    <Layout>
      <Toaster />
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="inputGroup">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button
            text="Register"
            className="bg-blue-600 hover:bg-blue-900"
            isLoading={registerMutation.isLoading}
          />
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
