import dayjs from "dayjs";
import { Task } from "@/interface/task";
import { Condition } from "@/interface/condition";
import { ResSubmissions } from "@/interface/task/getSubmissionsfile";

export const getSubmissions = async (task: Task, condition: Condition) => {
  await fetchSubmissions(task, condition);
  if (task.index === task.users.length) {
    finishGetSubmissions(task);
  }
};

export const fetchSubmissions = async (task: Task, condition: Condition) => {
  const user = task.users[task.index];
  const submissions: ResSubmissions = await fetch(
    `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${
      user.username
    }&from_second=${task.latestSubmitDateTime.unix()}`,
  ).then((res) => res.json());
  if (0 < submissions.length) {
    task.latestSubmitDateTime = dayjs(
      submissions[submissions.length - 1].epoch_second * 1000,
    );
  }

  submissions.forEach((e) => {
    task.submissions.add(e.id);
    const acceptDate = dayjs(e.epoch_second * 1000);
    if (
      !(e.problem_id in user.accepts) &&
      acceptDate < condition.endDateTime! &&
      e.result === "AC"
    ) {
      user.accepts[e.problem_id] = acceptDate;
    }
  });
  if (
    condition.endDateTime! <= task.latestSubmitDateTime ||
    submissions.length < 500
  ) {
    finishCurrentUser(task, condition);
  }
};

const finishCurrentUser = (task: Task, condition: Condition) => {
  task.index++;
  task.latestSubmitDateTime = condition.crawlBeginDateTime!;
};

const finishGetSubmissions = (task: Task) => {
  task.phase = "getRates";
  task.index = 0;
};
