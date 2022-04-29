import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Button, makeStyles, Hidden } from "@material-ui/core";
import ArmillarySphereIcon from "../ArmillarySphereIcon/ArmillarySphereIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appIcon: {
    marginRight: theme.spacing(2),
    height: "2.5rem",
    width: "2.5rem",
    "& g": {
      fill: "white",
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const AppToolbar = () => {
  const classes = useStyles();
  const title = "Seven Sisters characters";
  return (
    <>
      <Hidden smUp>
        <Toolbar style={{ minHeight: 22, fontSize: "0.8rem" }}>{title}</Toolbar>
      </Hidden>
      <Hidden xsDown>
        <Toolbar variant="dense">
          <ArmillarySphereIcon className={classes.appIcon} />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Graph
          </Button>
          <Button color="inherit" component={RouterLink} to="/debugger">
            Debugger
          </Button>
          <Button color="inherit" href="http://localhost:8001/?latest">
            Ratel
          </Button>
          <Button
            color="inherit"
            href="https://github.com/mdvanes/7sgraph/issues"
          >
            Github (issues)
          </Button>
        </Toolbar>
      </Hidden>
    </>
  );
};

export default AppToolbar;
