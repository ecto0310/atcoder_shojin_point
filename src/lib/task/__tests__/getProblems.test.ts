import "@testing-library/jest-dom";
import fetchMock from "fetch-mock";
import { defaultTask } from "@/interface/task";
import { getProblems } from "../getProblems";

jest.useFakeTimers();

describe("getProblems", () => {
  fetchMock.get("https://kenkoooo.com/atcoder/resources/problem-models.json", {
    problem1: {
      slope: 0,
      intercept: 0,
      variance: 0,
      difficulty: 0,
      discrimination: 0,
      irt_loglikelihood: 0,
      irt_users: 0,
      is_experimental: false,
    },
  });

  it("run getProblems", async () => {
    const task = defaultTask([]);
    await getProblems(task);
    expect(Object.keys(task.problems)).toEqual(["problem1"]);
    expect(task.phase).toEqual("getSubmissionCounts");
    expect(task.index).toEqual(0);
  });
});
