import { Task } from "@/interface/task";
import { ResRateHistories } from "@/interface/task/getRates";

export const getRates = async (task: Task) => {
  await fetchRates(task);
  if (task.index == task.users.length) {
    finishGetRates(task);
  }
};

const fetchRates = async (task: Task) => {
  const user = task.users[task.index];
  const rateHistories: ResRateHistories = await fetch(
    `https://kenkoooo.com/atcoder/proxy/users/${user.username}/history/json`
  ).then((res) => res.json());
  const rates = rateHistories.map((rateHistory) => rateHistory.NewRating);
  if (0 < rates.length) {
    user.latestRate = rates[rates.length - 1];
    user.highestRate = Math.max(...rates);
  }
  finishCurrentUser(task);
};

const finishCurrentUser = (task: Task) => {
  task.index++;
};

const finishGetRates = (task: Task) => {
  task.phase = "calcPoints";
};
