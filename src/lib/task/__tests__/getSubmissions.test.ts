import "@testing-library/jest-dom";
import { startTask } from "../../task";
import { Condition, defaultCondition } from "@/interface/condition";
import fetchMock from "fetch-mock";
import { getProblems } from "../getProblems";
import { Task, TaskPhase, defaultTask } from "@/interface/task";
import dayjs from "dayjs";
import { getSubmissionCounts } from "../getSubmissionCounts";
import { getSubmissions } from "../getSubmissions";

jest.useFakeTimers();

describe("getSubmissions", () => {
  fetchMock
    .get(
      "https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=username1&from_second=0",
      [
        {
          id: 0,
          epoch_second: 0,
          problem_id: "problem1",
          contest_id: "contest1",
          user_id: "username1",
          language: "C++",
          point: 100.0,
          length: 0,
          result: "AC",
          execution_time: 1,
        },
      ],
    )
    .get(
      "https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=username2&from_second=0",
      [
        {
          id: 0,
          epoch_second: 0,
          problem_id: "problem2",
          contest_id: "contest1",
          user_id: "username2",
          language: "C++",
          point: 100.0,
          length: 0,
          result: "AC",
          execution_time: 1,
        },
      ],
    );

  const initialize = (usernames: string[]): [Condition, Task] => {
    const condition = {
      ...defaultCondition(),
      beginDateTime: dayjs(0),
      crawlBeginDateTime: dayjs(0),
      endDateTime: dayjs(1704034800000),
    };
    const task = {
      ...defaultTask(usernames),
      phase: "getSubmissions" as TaskPhase,
      latestSubmitDateTime: condition.beginDateTime,
    };
    return [condition, task];
  };

  it("run getSubmissions (1 user)", async () => {
    const [condition, task] = initialize(["username1"]);
    while (task.phase === "getSubmissions") {
      await getSubmissions(task, condition);
    }

    expect(task.phase).toEqual("getRates");
    expect(Object.keys(task.users[0].accepts)).toEqual(["problem1"]);
  });

  it("run getSubmissions (2 user)", async () => {
    const [condition, task] = initialize(["username1", "username2"]);
    while (task.phase === "getSubmissions") {
      await getSubmissions(task, condition);
    }

    expect(task.phase).toEqual("getRates");
    expect(Object.keys(task.users[0].accepts)).toEqual(["problem1"]);
    expect(Object.keys(task.users[1].accepts)).toEqual(["problem2"]);
  });
});
