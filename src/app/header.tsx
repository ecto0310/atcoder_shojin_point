import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AtCoder Shojin Point
        </Typography>
        <Link href="https://github.com/ecto0310/atcoder_shojin_point">
          <Button>GitHub</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
