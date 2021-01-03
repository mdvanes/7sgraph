import React from "react";
import { Slider, Typography } from "@material-ui/core";
import { SET_TIME_RANGE } from "../../context/actions";
import { useGraphSettingsContext } from "../../context/GraphSettingsContext";
import { TIME_RANGE_MAX, TIME_RANGE_MIN } from "../../context/reducer";

// const valuetext = (value: number) => `${value}`;

const TimeRangeSlider = () => {
    const {
        dispatch,
        state: {  timeRange },
      } = useGraphSettingsContext();
    return (
    <>
      <Typography id="range-slider" gutterBottom style={{paddingLeft: "25px"}}>
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
        // getAriaValueText={valuetext}
        min={TIME_RANGE_MIN}
        max={TIME_RANGE_MAX}
      />
    </>
  );
};

export default TimeRangeSlider;
