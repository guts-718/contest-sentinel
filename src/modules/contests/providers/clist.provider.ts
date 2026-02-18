import { ContestProvider } from "./base.provider";
import { ProviderName } from "./providers.enum";
import { ProviderContest } from "../types/contest.types";
import { config } from "../../../core/env";
import { log } from "../../../core/logger";

const API_URL = `https://clist.by/api/v4/contest/?upcoming=true&format=json&limit=200&username=unused&api_key=${config.CONTEST_API_KEY}`;

export class ClistProvider implements ContestProvider {
  name = ProviderName.CLIST;

  async fetchContests(): Promise<ProviderContest[]> {
    const retries = 3;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        log.info(`[FETCH] CLIST attempt ${attempt}`);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(API_URL, {
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        return data.objects.map((c: any) => ({
          id: String(c.id),
          title: c.event,
          start: c.start,
          end: c.end,
          url: c.href,
        }));

      } catch (err: any) {
        log.error(`[FETCH] CLIST failed attempt ${attempt}: ${err.message}`);

        if (attempt === retries) {
          log.error("[FETCH] CLIST provider failed completely");
          return [];
        }

        await new Promise(r => setTimeout(r, 2000));
      }
    }

    return [];
  }
}
