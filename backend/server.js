import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";

import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import { Server } from "socket.io";

import amqp from "amqplib";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

let redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.REDIS_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set true if using HTTPS
});

// Use session middleware
app.use(sessionMiddleware);

// RabbitMQ configuration
const EXCHANGE_NAME = process.env.RABBITMQ_EXCHANGE_NAME;

// Setup Socket.IO to use sessions
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

async function startRabbitMQ() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, "fanout", {
    durable: false,
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("startOperation", async () => {
      // Simulate a time-consuming operation
      setTimeout(() => {
        const message = { status: "Operation completed", userId: socket.id };
        channel.publish(
          EXCHANGE_NAME,
          "",
          Buffer.from(JSON.stringify(message))
        );
      }, 10000); // 10 seconds delay
    });
  });

  const { queue } = await channel.assertQueue("", { exclusive: true });
  await channel.bindQueue(queue, EXCHANGE_NAME, "");
  channel.consume(
    queue,
    (msg) => {
      if (msg.content) {
        const message = JSON.parse(msg.content.toString());
        io.to(message.userId).emit("operationStatus", message);
      }
    },
    { noAck: true }
  );
}

startRabbitMQ();

// Determine the port based on PM2 instance ID
const instanceId = process.env.NODE_APP_INSTANCE;
const basePort = 5000;
const port = basePort + (instanceId ? parseInt(instanceId) : 0);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
