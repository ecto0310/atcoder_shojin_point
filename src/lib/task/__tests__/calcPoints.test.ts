import "@testing-library/jest-dom";
import { startTask } from "../../task";
import { Condition, defaultCondition } from "@/interface/condition";
import fetchMock from "fetch-mock";
import { getProblems } from "../getProblems";
import { Task, TaskPhase, defaultTask } from "@/interface/task";
import dayjs from "dayjs";
import { getSubmissionCounts } from "../getSubmissionCounts";
import { getSubmissions } from "../getSubmissions";
import { calcPoints } from "../calcPoints";

jest.useFakeTimers();

describe("calcPoints", () => {
  const initialize = (usernames: string[]): [Condition, Task] => {
    const condition = {
      ...defaultCondition(),
      pointFormula: "sumTee * latestRate * highestRate",
    };
    const task = {
      ...defaultTask(usernames),
      phase: "calcPoints" as TaskPhase,
      problems: {
        problem1: {
          intercept: 5,
          slope: -0.0001,
        },
      },

      users: [
        {
          username: "username1",
          submitCount: 0,
          accepts: { problem1: dayjs() },
          point: 0,
          sumTee: 0,
          latestRate: 100,
          highestRate: 200,
        },
      ],
    };
    return [condition, task];
  };

  it("run calcPoints)", async () => {
    const [condition, task] = initialize(["username1"]);
    while (task.phase === "calcPoints") {
      await calcPoints(task, condition);
    }

    expect(task.phase).toEqual("finish");
    expect(task.users[0].point).toBeCloseTo(1989686.31284, 5);
  });
});
