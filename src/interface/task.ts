import dayjs, { Dayjs } from "dayjs";
import { Condition } from "./condition";

export interface Task {
  phase:
    | "getProblems"
    | "getSubmissionCounts"
    | "getSubmissions"
    | "getRates"
    | "calcPoints"
    | "finish";
  problems: { [key: string]: Problem };
  users: User[];
  index: number;
  sumSubmissionCount: number;
  submissions: Set<number>;
  latestSubmitDateTime: Dayjs;
}

export interface Problem {
  intercept: number;
  slope: number;
}

export interface User {
  username: string;
  submitCount: number;
  accepts: { [key: string]: Dayjs };
  point: number;
  sumTee: number;
  latestRate: number;
  highestRate: number;
}

export const defaultTask = (usernames: string[]): Task => {
  return {
    phase: "getProblems",
    problems: {},
    users: usernames.map((username) => {
      return {
        username: username,
        submitCount: 0,
        accepts: {},
        point: 0,
        sumTee: 0,
        latestRate: 0,
        highestRate: 0,
      };
    }),
    index: 0,
    sumSubmissionCount: 0,
    submissions: new Set<number>(),
    latestSubmitDateTime: dayjs(),
  };
};
