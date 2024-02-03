import { Result } from "@/interface/result";
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

interface ResultTableProps {
  result: Result;
}

const ResultTable = ({ result }: ResultTableProps) => {
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
            <TableBody>
              {result.complete &&
                result.userResults.map((userResult, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell>{userResult.username}</TableCell>
                      <TableCell>{userResult.point}</TableCell>
                      <TableCell>{userResult.sumTee}</TableCell>
                      <TableCell>{userResult.highestRate}</TableCell>
                      <TableCell>{userResult.latestRate}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ResultTable;
