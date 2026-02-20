import { Request, Response } from "express";
import { getSettings, updateSettings } from "./services/settings.service";

export async function getSettingsHandler(_: Request, res: Response) {
  const settings = await getSettings();
  res.json(settings);
}

export async function updateSettingsHandler(req: Request, res: Response) {
  try {
    const updated = await updateSettings(req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}