"use client";

import React, { useState } from "react";

import LoginForm from "../components/LoginForm";
import StatusPage from "../components/StatusPage";

const Page = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? <LoginForm onLogin={handleLogin} /> : <StatusPage />}
    </div>
  );
};

export default Page;
