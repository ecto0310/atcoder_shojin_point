import "@testing-library/jest-dom";
import { startTask } from "../../task";
import { Condition, defaultCondition } from "@/interface/condition";
import fetchMock from "fetch-mock";
import { getProblems } from "../getProblems";
import { Task, TaskPhase, defaultTask } from "@/interface/task";
import dayjs from "dayjs";
import { getSubmissionCounts } from "../getSubmissionCounts";

jest.useFakeTimers();

describe("getSubmissionCounts", () => {
  fetchMock
    .get(
      "https://kenkoooo.com/atcoder/atcoder-api/v3/user/submission_count?user=username1&from_second=0&to_second=1704034800",
      {
        count: 1,
      },
    )
    .get(
      "https://kenkoooo.com/atcoder/atcoder-api/v3/user/submission_count?user=username2&from_second=0&to_second=1704034800",
      {
        count: 2,
      },
    );

  const initialize = (usernames: string[]): [Condition, Task] => {
    const condition = {
      ...defaultCondition(),
      beginDateTime: dayjs(0),
      endDateTime: dayjs(1704034800000),
    };
    const task = {
      ...defaultTask(usernames),
      phase: "getSubmissionCounts" as TaskPhase,
    };
    return [condition, task];
  };

  it("run getSubmissionCounts (1 user)", async () => {
    const [condition, task] = initialize(["username1"]);
    while (task.phase === "getSubmissionCounts") {
      await getSubmissionCounts(task, condition);
    }

    expect(task.phase).toEqual("getSubmissions");
    expect(task.index).toEqual(0);
    expect(task.sumSubmissionCount).toEqual(1);
    expect(task.latestSubmitDateTime).toEqual(dayjs(0));
  });

  it("run getSubmissionCounts (2 user)", async () => {
    const [condition, task] = initialize(["username1", "username2"]);
    while (task.phase === "getSubmissionCounts") {
      await getSubmissionCounts(task, condition);
    }

    expect(task.phase).toEqual("getSubmissions");
    expect(task.index).toEqual(0);
    expect(task.sumSubmissionCount).toEqual(3);
    expect(task.latestSubmitDateTime).toEqual(condition.beginDateTime);
  });
});
