export interface Result {
  complete: boolean;
  userResults: UserResult[];
}

export const defaultResult = (): Result => {
  return {
    complete: false,
    userResults: [],
  };
};

export interface UserResult {
  username: string;
  point: number;
  sumTee: number;
  highestRate: number;
  latestRate: number;
}
