import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { SET_BOOK_FILTER } from "../../context/actions";
import { useGraphSettingsContext } from "../../context/GraphSettingsContext";

const GraphTools = () => {
  const {
    dispatch,
    state: { searchByBook },
  } = useGraphSettingsContext();
  // TODO add dropdown
  // TODO wrap in Card and overlay over graph
  // TODO add "details" view Card in corner
  return (
    <div style={{ position: "absolute" }}>
      Search by book: TODO dropdown
      <button
        onClick={() => {
          dispatch({ type: SET_BOOK_FILTER, payload: "book1" });
        }}
      >
        test
      </button>
      {searchByBook}
      {/* className={classes.formControl} */}
      <FormControl variant="outlined" style={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-outlined-label">
          Search by book
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={searchByBook}
          onChange={(event) => {
            dispatch({ type: SET_BOOK_FILTER, payload: event.target.value });
          }}
          label="Search by book"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="book1">The Seven Sisters</MenuItem>
          <MenuItem value="book2">The Storm Sister</MenuItem>
          <MenuItem value="book3">The Shadow Sister</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default GraphTools;
