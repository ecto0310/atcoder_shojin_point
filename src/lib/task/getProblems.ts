import { Task } from "@/interface/task";
import {
  ResProblems,
  isProblemModelWithTimeModel,
} from "@/interface/task/getPtoblems";

export const getProblems = async (task: Task) => {
  const problems: ResProblems = await fetch(
    "https://kenkoooo.com/atcoder/resources/problem-models.json"
  ).then((res) => res.json());

  for (const problemId in problems) {
    if (isProblemModelWithTimeModel(problems[problemId])) {
      task.problems[problemId] = problems[problemId];
    }
  }

  finishGetProblems(task);
};

const finishGetProblems = (task: Task) => {
  task.phase = "getSubmissionCounts";
  task.index = 0;
};
