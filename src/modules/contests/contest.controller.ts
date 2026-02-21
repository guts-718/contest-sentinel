import { Request, Response } from "express";
import { ContestModel } from "./model/contest.model";

export async function getUpcomingContests(_: Request, res: Response) {
  try {
    const now = new Date();
    const next24h = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const contests = await ContestModel.find({
      startTime: { $gte: now, $lte: next24h },
    }).sort({ startTime: 1 });

    res.json(contests);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllContests(_: Request, res: Response) {
  const contests = await ContestModel
    .find({})
    .sort({ startTime: 1 });

  res.json(contests);
}