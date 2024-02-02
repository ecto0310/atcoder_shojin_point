import { Button, Grid } from "@mui/material";

const RunButton = () => {
  return (
    <Grid
      container
      item
      alignItems="center"
      justifyContent="center"
      sx={{ pt: 2 }}
    >
      <Grid item xs={3}>
        <Button variant="contained" sx={{ width: 1 }}>
          Run
        </Button>
      </Grid>
    </Grid>
  );
};

export default RunButton;
