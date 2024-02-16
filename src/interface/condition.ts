import { Dayjs } from "dayjs";

export interface Condition {
  username: string[];
  beginDateTime: Dayjs | null;
  crawlBeginDateTime: Dayjs | null;
  endDateTime: Dayjs | null;
  pointFormula: string;
  onlyUniqueAC: boolean;
}

export const defaultCondition = (): Condition => {
  return {
    username: [],
    beginDateTime: null,
    crawlBeginDateTime: null,
    endDateTime: null,
    pointFormula: "sumTee * 5000 / highestRate",
    onlyUniqueAC: true,
  };
};
