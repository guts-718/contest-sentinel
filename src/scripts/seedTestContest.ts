import mongoose from "mongoose";
import { config } from "../core/env";
import { ContestModel } from "../modules/contests/model/contest.model";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

async function run() {
  try {
    await mongoose.connect(config.MONGO_URI);

    const start = new Date(Date.now() + 20 * 60 * 1000); // 20 min from now
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const id = "test:contest";

    await ContestModel.updateOne(
      { _id: id },
      {
        $set: {
          _id: id,
          platform: "codeforces",
          title: "Test Contest (Debug)",
          startTime: start,
          endTime: end,
          durationMinutes: 60,
          url: "https://example.com/test",
        },
      },
      { upsert: true }
    );

    console.log("Test contest inserted");
    process.exit(0);

  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

run();
