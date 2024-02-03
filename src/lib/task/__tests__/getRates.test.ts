import "@testing-library/jest-dom";
import { startTask } from "../../task";
import { Condition, defaultCondition } from "@/interface/condition";
import fetchMock from "fetch-mock";
import { getProblems } from "../getProblems";
import { Task, TaskPhase, defaultTask } from "@/interface/task";
import dayjs from "dayjs";
import { getSubmissionCounts } from "../getSubmissionCounts";
import { getSubmissions } from "../getSubmissions";
import { getRates } from "../getRates";

jest.useFakeTimers();

describe("getRates", () => {
  fetchMock
    .get("https://kenkoooo.com/atcoder/proxy/users/username1/history/json", [
      {
        IsRated: true,
        Place: 1,
        OldRating: 0,
        NewRating: 100,
        Performance: 1474,
        InnerPerformance: 0,
        ContestScreenName: "",
        ContestName: "Contest1",
        ContestNameEn: "",
        EndTime: "2024-01-01T00:00:00+09:00",
      },
    ])
    .get("https://kenkoooo.com/atcoder/proxy/users/username2/history/json", [
      {
        IsRated: true,
        Place: 1,
        OldRating: 0,
        NewRating: 200,
        Performance: 1474,
        InnerPerformance: 0,
        ContestScreenName: "",
        ContestName: "Contest1",
        ContestNameEn: "",
        EndTime: "2024-01-01T00:00:00+09:00",
      },
      {
        IsRated: true,
        Place: 1,
        OldRating: 200,
        NewRating: 100,
        Performance: 1474,
        InnerPerformance: 0,
        ContestScreenName: "",
        ContestName: "Contest2",
        ContestNameEn: "",
        EndTime: "2024-01-02T00:00:00+09:00",
      },
    ]);

  const initialize = (usernames: string[]): [Task] => {
    const task = {
      ...defaultTask(usernames),
      phase: "getRates" as TaskPhase,
    };
    return [task];
  };

  it("run getRates (1 user)", async () => {
    const [task] = initialize(["username1"]);
    while (task.phase === "getRates") {
      await getRates(task);
    }

    expect(task.phase).toEqual("calcPoints");
    expect(task.users[0].highestRate).toEqual(100);
    expect(task.users[0].latestRate).toEqual(100);
  });

  it("run getRates (2 user)", async () => {
    const [task] = initialize(["username1", "username2"]);
    while (task.phase === "getRates") {
      await getRates(task);
    }

    expect(task.phase).toEqual("calcPoints");
    expect(task.users[0].highestRate).toEqual(100);
    expect(task.users[0].latestRate).toEqual(100);
    expect(task.users[1].highestRate).toEqual(200);
    expect(task.users[1].latestRate).toEqual(100);
  });
});
