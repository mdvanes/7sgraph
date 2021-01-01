import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
import { SET_BOOK_FILTER } from "../../context/actions";
import { useGraphSettingsContext } from "../../context/GraphSettingsContext";
import useStyles from "./GraphTools.styles";

const GraphTools = () => {
  const classes = useStyles();

  const {
    dispatch,
    state: { searchByBook },
  } = useGraphSettingsContext();

  // TODO add "details" view Card in corner
  return (
    <div className={classes.root}>
      <Card classes={{ root: classes.cardRoot }}>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <FormControl
            variant="outlined"
            classes={{ root: classes.formControlRoot }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Search by book
            </InputLabel>
            {/* This can be improved by retrieving books with a query */}
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={searchByBook}
              onChange={(event) => {
                dispatch({
                  type: SET_BOOK_FILTER,
                  payload: event.target.value,
                });
              }}
              label="Search by book"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="book1">The Seven Sisters</MenuItem>
              <MenuItem value="book2">The Storm Sister</MenuItem>
              <MenuItem value="book3">The Shadow Sister</MenuItem>
              <MenuItem value="book4">The Pearl Sisters</MenuItem>
              <MenuItem value="book5">The Moon Sister</MenuItem>
              <MenuItem value="book6">The Sun Sister</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphTools;
