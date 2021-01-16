import { FormControl, InputLabel, Select, MenuItem, SelectProps } from "@material-ui/core";
import { FC } from "react";
import { GraphSettingsState } from "../../context/reducer";
import useStyles from "./GraphTools.styles";

interface Props {
  searchByBook: GraphSettingsState["searchByBook"];
  onChange: SelectProps["onChange"];
}

const BookSelector: FC<Props> = ({ searchByBook, onChange }) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" classes={{ root: classes.formControlRoot }}>
      <InputLabel id="demo-simple-select-outlined-label">
        Search by book
      </InputLabel>
      {/* This can be improved by retrieving books with a query */}
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={searchByBook}
        onChange={onChange}
        label="Search by book"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="book1">The Seven Sisters</MenuItem>
        <MenuItem value="book2">The Storm Sister</MenuItem>
        <MenuItem value="book3">The Shadow Sister</MenuItem>
        <MenuItem value="book4">The Pearl Sister</MenuItem>
        <MenuItem value="book5">The Moon Sister</MenuItem>
        <MenuItem value="book6">The Sun Sister</MenuItem>
        <MenuItem value="all">All</MenuItem>
      </Select>
    </FormControl>
  );
};

export default BookSelector;
