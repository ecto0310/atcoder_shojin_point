import { Dayjs } from "dayjs";

export interface Condition {
  username: string[];
  beginDateTime: Dayjs | null;
  endDateTime: Dayjs | null;
  pointFormula: string;
}

export const defaultCondition = (): Condition => {
  return {
    username: [],
    beginDateTime: null,
    endDateTime: null,
    pointFormula: "sumTee * 5000 / highestRate",
  };
};
