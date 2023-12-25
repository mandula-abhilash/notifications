import React, { useEffect } from "react";

import LoginForm from "./LoginForm";
import StatusPage from "./StatusPage";

import { useGlobalContext } from "@/contexts/GlobalContext";

const AuthenticationLogic = () => {
  const { user } = useGlobalContext();

  return !user ? <LoginForm /> : <StatusPage />;
};

export default AuthenticationLogic;
