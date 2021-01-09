import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: `calc(100% - ${theme.spacing(4)}px)`,
    margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    transition: "height 200ms"
  },
  closed: {
    overflow: "hidden",
    height: theme.spacing(2),
    width: theme.spacing(2),
    transition: "height 200ms"
  },
  gridRoot: {
    flexGrow: 1,
  },
  cardRoot: {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  cardContentRoot: {
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    },
  },
  formControlRoot: {
    width: "100%",
  },
  collapseButton: {
    position: "absolute",
    left: theme.spacing(-2),
    top: theme.spacing(-2),
  },
}));

export default useStyles;
