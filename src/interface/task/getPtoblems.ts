export type ResProblems = { [id: string]: ResProblem };

export interface ResProblem {
  slope: number;
  intercept: number;
  variance: number;
  difficulty: number | undefined;
  rawDifficulty: number | undefined;
  discrimination: number | undefined;
  is_experimental: boolean;
}

export const isProblemModelWithTimeModel = (problem: ResProblem): boolean => {
  return (
    typeof problem.slope === "number" &&
    typeof problem.intercept === "number" &&
    typeof problem.variance === "number" &&
    (typeof problem.difficulty === "number" ||
      typeof problem.difficulty === "undefined") &&
    (typeof problem.rawDifficulty === "number" ||
      typeof problem.rawDifficulty === "undefined") &&
    (typeof problem.discrimination === "number" ||
      typeof problem.discrimination === "undefined") &&
    typeof problem.is_experimental === "boolean"
  );
};
