import React, { useEffect, useState } from "react";
import io from "socket.io-client";

console.log(process.env.NEXT_PUBLIC_SERVER_URL);

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);

const StatusPage = () => {
  const [status, setStatus] = useState("");

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
    <div className="flex flex-col text-center space-y-6">
      <h1 className="text-2xl uppercase">Real-time Notifications</h1>
      <p>Status: {status}</p>
      <button
        className="border border-green-500 text-green-500 shadow-md rounded-md px-4 py-2"
        onClick={startOperation}
      >
        Start Operation
      </button>
    </div>
  );
};

export default StatusPage;
