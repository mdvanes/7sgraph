import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import {
  Link as RouterLink,
} from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import ArmillarySphereIcon from "../ArmillarySphereIcon/ArmillarySphereIcon";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appIcon: {
      marginRight: theme.spacing(2),
      height: "3rem",
      width: "3rem",
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
    return (
    <Toolbar>
      <ArmillarySphereIcon className={classes.appIcon} />
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Seven Sisters characters graph
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
      <Button color="inherit" href="https://github.com/mdvanes/7sgraph/issues">
        Github (issues)
      </Button>
    </Toolbar>
  );
};

export default AppToolbar;
