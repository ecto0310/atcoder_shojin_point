import { Condition } from "@/interface/condition";
import { Problem, Task, User } from "@/interface/task";
import { evaluate } from "mathjs";

const topPlayerRating = 4000;

export const calcPoints = async (task: Task, condition: Condition) => {
  for (const user of task.users) {
    calcTee(user, task.problems);
    user.point = evaluate(condition.pointFormula, {
      sumTee: user.sumTee,
      latestRate: user.latestRate,
      highestRate: user.highestRate,
    });
  }
  finishCalcPoints(task);
};

const calcTee = (user: User, problems: { [key: string]: Problem }) => {
  for (const problemId in user.accepts) {
    if (problemId in problems) {
      user.sumTee += Math.exp(
        problems[problemId].slope * topPlayerRating +
          problems[problemId].intercept,
      );
    }
  }
};

const finishCalcPoints = (task: Task) => {
  task.phase = "finish";
};
