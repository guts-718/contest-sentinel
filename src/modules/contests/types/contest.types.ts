export enum Platform {
  CODEFORCES = "codeforces",
  CODECHEF = "codechef",
  LEETCODE = "leetcode",
  ATCODER = "atcoder",
}

export type NormalizedContest = {
  id: string;               // provider contest id
  platform: Platform;
  title: string;
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
  url: string;
};

export type ProviderContest = {
  id: string;
  title: string;
  start: string | number | Date;
  end: string | number | Date;
  url: string;
};
