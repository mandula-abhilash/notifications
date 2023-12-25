import React, { useState } from "react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import axios from "axios";
import StatusPage from "./StatusPage";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser, handleLogin } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`,
        { email, password },
        { withCredentials: true },
        { headers: { "Content-Type": "application/json" } }
      );

      handleLogin(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.error("Login error:", JSON.stringify(error, null, 2));
    }
  };

  return !user ? (
    <div className="flex flex-col mx-auto max-w-lg w-full bg-white rounded-md shadow-2xl px-20 py-16">
      <h1 className="text-xl font-bold text-center mb-16">LOGIN</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-800 font-semibold">Username:</label>
          <input
            type="text"
            value={email}
            className="border border-gray-200 rounded mt-1 py-1"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-gray-800 font-semibold">Password:</label>
          <input
            type="password"
            value={password}
            className="border border-gray-200 rounded mt-1 py-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-md w-full"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  ) : (
    <StatusPage />
  );
};

export default LoginForm;
