import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React, { FC } from "react";
import useStyles from "./GraphDetails.styles";

interface Props {
    name: string;
}

const GraphDetails:FC<Props> = ({name}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card classes={{ root: classes.cardRoot }}>
        <CardHeader title={name} />
        <CardContent>
          <Typography variant="body2">Nicknames: Bo, Atlas</Typography>
          <Typography variant="body2">Main book: The Seven Sisters</Typography>
          <Typography variant="body2">🚼 1910</Typography>
          <Typography variant="body2">✝️ yes</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphDetails;
