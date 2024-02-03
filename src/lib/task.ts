import { Condition } from "@/interface/condition";
import { Progress, defaultProgress } from "@/interface/progress";
import { Result, defaultResult } from "@/interface/result";
import { Task, defaultTask } from "@/interface/task";
import { Dispatch, SetStateAction } from "react";
import { getProblems } from "./task/getProblems";
import { getSubmissionCounts } from "./task/getSubmissionCounts";
import { getSubmissions } from "./task/getSubmissions";
import { getRates } from "./task/getRates";
import { calcPoints } from "./task/calcPoints";
import dayjs from "dayjs";

export const startTask = (
  condition: Condition,
  setResult: Dispatch<SetStateAction<Result>>,
  setProgress: Dispatch<SetStateAction<Progress>>
) => {
  condition.beginDateTime ??= dayjs(0);
  condition.endDateTime ??= dayjs();
  const task = defaultTask(condition.username);
  setResult(defaultResult);
  setProgress(calcProgress(task));
  runTask(task, condition, setResult, setProgress);
};

const runTask = async (
  task: Task,
  condition: Condition,
  setResult: Dispatch<SetStateAction<Result>>,
  setProgress: Dispatch<SetStateAction<Progress>>
) => {
  switch (task.phase) {
    case "getProblems":
      await getProblems(task);
      break;
    case "getSubmissionCounts":
      await getSubmissionCounts(task, condition);
      break;
    case "getSubmissions":
      await getSubmissions(task, condition);
      break;
    case "getRates":
      await getRates(task);
      break;
    case "calcPoints":
      await calcPoints(task, condition);
      break;
  }
  if (task.phase === "calcPoints") {
    setTimeout(runTask, 0, task, condition, setResult, setProgress);
  } else if (task.phase !== "finish") {
    setTimeout(runTask, 20000, task, condition, setResult, setProgress);
  }
  if (task.phase === "finish") {
    setResult({
      complete: true,
      userResults: task.users.map((user) => {
        return {
          username: user.username,
          point: user.point,
          sumTee: user.sumTee,
          highestRate: user.highestRate,
          latestRate: user.latestRate,
        };
      }),
    });
  }
  setProgress(calcProgress(task));
};

const calcProgress = (task: Task) => {
  const progress: Progress = {
    ...defaultProgress(),
    running: true,
  };
  switch (task.phase) {
    case "getProblems":
      progress.percentage = 1;
      break;
    case "getSubmissionCounts":
      progress.percentage = 1 + 4 * (task.index / task.users.length);
      break;
    case "getSubmissions":
      progress.percentage =
        5 + 90 * (task.submissions.size / task.sumSubmissionCount);
      break;
    case "getRates":
      progress.percentage = 95 + 4 * (task.index / task.users.length);
      break;
    case "calcPoints":
      progress.percentage = 99;
      break;
    case "finish":
      progress.running = false;
      break;
  }
  return progress;
};
