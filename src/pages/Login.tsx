import { useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../api";
import sleep from "../utils/sleep";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginMutaion = useMutation({
    mutationFn: async () => {
      await sleep(1000);
      const res = await api.post("/auth/login", { email, password });
      return res.data;
    },
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (data: any) => {
      console.log(data);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(email, password);

    loginMutaion.mutate();
  };

  return (
    <Layout>
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
          <Button
            text="login"
            className="bg-blue-600 hover:bg-blue-900"
            isLoading={loginMutaion.isLoading}
          />
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
