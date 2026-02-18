import mongoose from "mongoose";
import { config } from "./env";
import { log } from "./logger";
import dns from "node:dns/promises";


dns.setServers(["1.1.1.1"]);


let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    log.db("connecting to MongoDB...");

    await mongoose.connect(config.MONGO_URI);

    isConnected = true;
    log.db("MongoDB connected");

    mongoose.connection.on("disconnected", () => {
      isConnected = false;
      log.error("MongoDB disconnected");
      retryConnection();
    });

    mongoose.connection.on("error", (err) => {
      log.error("MongoDB error: " + err.message);
    });

  } catch (err: any) {
    log.error("Initial Mongo connection failed: " + err.message);
    retryConnection();
  }
}

function retryConnection() {
  setTimeout(() => {
    log.db("retrying MongoDB connection...");
    connectDB();
  }, 5000);
}

export function isDBConnected() {
  return isConnected;
}
