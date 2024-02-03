import { Grid, Input, InputLabel } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import RunButton from "./runButton";
import { Dispatch, SetStateAction, useState } from "react";
import { Result } from "@/interface/result";
import { defaultCondition } from "@/interface/condition";

interface ConditionFormProps {
  setResult: Dispatch<SetStateAction<Result>>;
}

const ConditionForm = ({ setResult }: ConditionFormProps) => {
  const [condition, setCondition] = useState(defaultCondition());

  return (
    <Grid container>
      <Grid
        container
        item
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ pt: 2 }}
      >
        <Grid item xs={8}>
          <InputLabel htmlFor="user-name">Username(split comma)</InputLabel>
          <Input
            id="user-name"
            sx={{ width: 1 }}
            value={condition.username}
            onChange={(e) => {
              setCondition({
                ...condition,
                username:
                  e.target.value === "" ? [] : e.target.value.split(","),
              });
            }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ pt: 2 }}
      >
        <Grid item xs={2}>
          <DateTimePicker
            label="Begin Date Time"
            sx={{ width: 1 }}
            ampm={false}
            slotProps={{
              actionBar: { actions: ["today", "clear", "cancel", "accept"] },
            }}
            value={condition.beginDateTime}
            onChange={(newDateTime) =>
              setCondition({
                ...condition,
                beginDateTime: newDateTime,
              })
            }
          />
        </Grid>
        <Grid item xs={2}>
          <DateTimePicker
            label="End Date Time"
            sx={{ width: 1 }}
            ampm={false}
            slotProps={{
              actionBar: { actions: ["today", "clear", "cancel", "accept"] },
            }}
            value={condition.endDateTime}
            onChange={(newDateTime) =>
              setCondition({
                ...condition,
                endDateTime: newDateTime,
              })
            }
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel htmlFor="point-formula">Point Formula</InputLabel>
          <Input
            id="point-formula"
            sx={{ width: 1 }}
            value={condition.pointFormula}
            onChange={(e) =>
              setCondition({
                ...condition,
                pointFormula: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
      <RunButton condition={condition} setResult={setResult} />
    </Grid>
  );
};

export default ConditionForm;
