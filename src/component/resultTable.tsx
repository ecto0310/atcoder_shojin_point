import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from "@mui/material";

const ResultTable = () => {
  return (
    <Grid container alignItems="center" justifyContent="center" sx={{ pt: 2 }}>
      <Grid item xs={8}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>username</TableCell>
                <TableCell>point</TableCell>
                <TableCell>sumTee</TableCell>
                <TableCell>highestRate</TableCell>
                <TableCell>latestRate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ResultTable;
