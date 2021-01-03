import { Card, CardContent, Grid } from "@material-ui/core";
import React from "react";
import { SET_BOOK_FILTER } from "../../context/actions";
import { useGraphSettingsContext } from "../../context/GraphSettingsContext";
import BookSelector from "./BookSelector";
import useStyles from "./GraphTools.styles";
import TimeRangeSlider from "./TimeRangeSlider";

const GraphTools = () => {
  const classes = useStyles();

  const {
    dispatch,
    state: { searchByBook },
  } = useGraphSettingsContext();

  return (
    <div className={classes.root}>
      <Card classes={{ root: classes.cardRoot }}>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <Grid container spacing={4} classes={{ root: classes.gridRoot }}>
            <Grid item xs={2}>
              <BookSelector
                searchByBook={searchByBook}
                onChange={(event) => {
                  dispatch({
                    type: SET_BOOK_FILTER,
                    payload: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TimeRangeSlider />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphTools;
