import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }) => ({
  root: {
      position: "absolute",
      bottom: spacing(2),
      right: spacing(2),
  },
  cardRoot: {
    backgroundColor: "rgba(255,255,255,0.5)",
    height: 275,
    width: 200,
  },
}));

export default useStyles;