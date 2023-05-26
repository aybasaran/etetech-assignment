import React, { useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { Link } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import api from "../api";

const Register: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const registerMutation = useMutation({
    mutationFn: async () => {
      await api.post("/auth/register", {});
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");

    // registerMutation.mutate();
  };

  return (
    <Layout>
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
