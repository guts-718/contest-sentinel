import { Request, Response } from "express";
import { getSyncStatus } from "./sync.status";

export function syncStatusHandler(_ : Request, res: Response) {
  res.json(getSyncStatus());
}
