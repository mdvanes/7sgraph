import { Card, CardContent, Grid, IconButton } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import { SET_BOOK_FILTER } from "../../context/actions";
import { useGraphSettingsContext } from "../../context/GraphSettingsContext";
import BookSelector from "./BookSelector";
import useStyles from "./GraphTools.styles";
import TimeRangeSlider from "./TimeRangeSlider";

const GraphTools = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  const {
    dispatch,
    state: { searchByBook },
  } = useGraphSettingsContext();

  const rootClass = isOpen ? classes.root : `${classes.root} ${classes.closed}`;

  return (
    <div className={rootClass}>
      <Card classes={{ root: classes.cardRoot }}>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <Grid container spacing={4} classes={{ root: classes.gridRoot }}>
            <Grid item xs={12} sm={4} md={2}>
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
            <Grid item xs md={4}>
              <TimeRangeSlider />
            </Grid>
          </Grid>

          <IconButton
            aria-label="collapse"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className={classes.collapseButton}
          >
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphTools;
