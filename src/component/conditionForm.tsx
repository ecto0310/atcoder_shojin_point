import { Grid, Input, InputLabel } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import RunButton from "./runButton";

const ConditionForm = () => {
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
          <Input id="user-name" sx={{ width: 1 }} />
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
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel htmlFor="point-formula">Point Formula</InputLabel>
          <Input id="point-formula" sx={{ width: 1 }} />
        </Grid>
      </Grid>
      <RunButton />
    </Grid>
  );
};

export default ConditionForm;
