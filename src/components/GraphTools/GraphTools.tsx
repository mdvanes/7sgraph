import {
  Card,
  CardContent,
  Grid,
  Slider,
  Typography,
} from "@material-ui/core";
import React from "react";
import { SET_BOOK_FILTER, SET_TIME_RANGE } from "../../context/actions";
import { useGraphSettingsContext } from "../../context/GraphSettingsContext";
import { TIME_RANGE_MAX, TIME_RANGE_MIN } from "../../context/reducer";
import BookSelector from "./BookSelector";
import useStyles from "./GraphTools.styles";

const valuetext = (value: number) => `${value}c`;

const GraphTools = () => {
  const classes = useStyles();

  const {
    dispatch,
    state: { searchByBook, timeRange },
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
              <div>
                <Typography id="range-slider" gutterBottom>
                  Time range
                </Typography>
                <Slider
                  value={timeRange}
                  onChange={(event, newValue: number | number[]) => {
                    dispatch({
                      type: SET_TIME_RANGE,
                      payload: newValue as number[],
                    });
                  }}
                  valueLabelDisplay="on"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  min={TIME_RANGE_MIN}
                  max={TIME_RANGE_MAX}
                />
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphTools;
