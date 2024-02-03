import { Condition } from "@/interface/condition";
import { defaultProgress } from "@/interface/progress";
import { Result } from "@/interface/result";
import { startTask } from "@/lib/task";
import { Button, CircularProgress, Grid, LinearProgress } from "@mui/material";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";

interface RunButtonProps {
  condition: Condition;
  setResult: Dispatch<SetStateAction<Result>>;
}

const RunButton = ({ condition, setResult }: RunButtonProps) => {
  const [progress, setProgress] = useState(defaultProgress());

  if (progress.running) {
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ pt: 2 }}
      >
        <Grid item xs={1} alignItems="center">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        </Grid>
        <Grid item xs={6}>
          <LinearProgress variant="determinate" value={progress.percentage} />
        </Grid>
        <Grid item xs={1}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {Math.round(progress.percentage)}%
          </div>
        </Grid>
      </Grid>
    );
  }

  const triggerStartTask = () => {
    condition.beginDateTime ??= dayjs(0);
    condition.endDateTime ??= dayjs();
    startTask(condition, setResult, setProgress);
  };

  return (
    <Grid
      container
      item
      alignItems="center"
      justifyContent="center"
      sx={{ pt: 2 }}
    >
      <Grid item xs={3}>
        <Button
          variant="contained"
          sx={{ width: 1 }}
          onClick={triggerStartTask}
        >
          Run
        </Button>
      </Grid>
    </Grid>
  );
};

export default RunButton;
