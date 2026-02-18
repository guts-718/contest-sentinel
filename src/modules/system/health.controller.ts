import { Request, Response } from "express";
import { isDBConnected } from "../../core/db";

const startTime = Date.now();

export function healthHandler(req: Request, res: Response) {
  console.log("Request: ",req);
  res.json({
    status: "ok",
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    database: isDBConnected() ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
}
