import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);

const StatusPage = () => {
  const [status, setStatus] = useState("");
  const { user, handleLogout } = useGlobalContext();

  useEffect(() => {
    const handleOperationStatus = (message) => {
      setStatus(message.status);
    };

    socket.on("operationStatus", handleOperationStatus);

    return () => {
      socket.off("operationStatus", handleOperationStatus);
    };
  }, []);

  const startOperation = () => {
    socket.emit("startOperation");
    setStatus("Operation started...");
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto my-auto h-screen">
      <div className="relative flex flex-col text-center space-y-6">
        <h1 className="text-2xl uppercase">Real-time Notifications</h1>
        {user ? (
          <p>Hello {user && user.name}</p>
        ) : (
          <div className="">Loading..</div>
        )}

        {status && <p>Status: {status}</p>}
        <button
          className="border border-green-500 text-green-500 shadow-md rounded-md px-4 py-2"
          onClick={startOperation}
        >
          Start Operation
        </button>
      </div>
      <button
        className="absolute right-10 top-10 border border-red-500 text-red-500 shadow-md rounded-md px-4 py-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default StatusPage;
