import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AtCoder Shojin Point
        </Typography>
        <Button
          color="inherit"
          startIcon={<GitHubIcon />}
          component={Link}
          href="https://github.com/ecto0310/atcoder_shojin_point"
        >
          GitHub
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
