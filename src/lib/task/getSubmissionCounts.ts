import { Condition } from "@/interface/condition";
import { Task } from "@/interface/task";
import { ResSubmissionCount } from "@/interface/task/getSubmissionCounts";

export const getSubmissionCounts = async (task: Task, condition: Condition) => {
  await fetchSubmissionCounts(task, condition);
  if (task.index == task.users.length) {
    finishGetSubmissionCounts(task, condition);
  }
};

const fetchSubmissionCounts = async (task: Task, condition: Condition) => {
  const user = task.users[task.index];
  const submissionCount: ResSubmissionCount = await fetch(
    `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submission_count?user=${
      user.username
    }&from_second=${condition.crawlBeginDateTime?.unix()}&to_second=${condition.endDateTime?.unix()}`,
  ).then((res) => res.json());
  user.submitCount = submissionCount.count;
  finishCurrentUser(task);
};

const finishCurrentUser = (task: Task) => {
  task.index++;
};

const finishGetSubmissionCounts = (task: Task, condition: Condition) => {
  task.phase = "getSubmissions";
  task.sumSubmissionCount = task.users
    .map((user) => user.submitCount)
    .reduce((sum, now) => sum + now, 0);
  task.submissions = new Set<number>();
  task.index = 0;
  task.latestSubmitDateTime = condition.crawlBeginDateTime!;
};
