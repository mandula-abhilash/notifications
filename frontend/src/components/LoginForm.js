import React, { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="text-gray-800 font-semibold">Username:</label>
        <input
          type="text"
          value={username}
          className="border border-gray-200 rounded mt-1 py-1"
          onChange={(e) => setUsername(e.target.value)}
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
  );
};

export default LoginForm;
