import { ProviderContest } from "../types/contest.types";
import { ProviderName } from "./providers.enum";

export interface ContestProvider {
  name: ProviderName;

  fetchContests(): Promise<ProviderContest[]>;
}
