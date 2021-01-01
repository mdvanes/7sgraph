import {
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@material-ui/core";
import React from "react";
import { SET_BOOK_FILTER } from "../../context/actions";
import { useGraphSettingsContext } from "../../context/GraphSettingsContext";
import BookSelector from "./BookSelector";
import useStyles from "./GraphTools.styles";

const valuetext = (value: number) => `${value}c`;

const GraphTools = () => {
  const classes = useStyles();

  const {
    dispatch,
    state: { searchByBook },
  } = useGraphSettingsContext();

  const min = 1800;
  const max = 2008;

  const value = [min, max];

  // TODO add "details" view Card in corner
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
                  value={value}
                  onChange={() => {
                    console.log("change");
                  }}
                  valueLabelDisplay="on"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  min={min}
                  max={max}
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
