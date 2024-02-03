export interface Progress {
  running: boolean;
  percentage: number;
}

export const defaultProgress = (): Progress => {
  return {
    running: false,
    percentage: 0,
  };
};
