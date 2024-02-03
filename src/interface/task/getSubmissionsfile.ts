export type ResSubmissions = ResSubmission[];

export interface ResSubmission {
  id: number;
  epoch_second: number;
  problem_id: string;
  user_id: string;
  language: string;
  point: number;
  length: number;
  result: string;
  execution_time: number;
}
