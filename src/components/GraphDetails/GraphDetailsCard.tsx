import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { PersonWithLinksFieldsFragment } from "../../generated/graphql";
import useStyles from "./GraphDetails.styles";

interface CardProps {
  title: string;
  uid: string;
  nickNames?: PersonWithLinksFieldsFragment["nickNames"];
  story?: PersonWithLinksFieldsFragment["story"];
  dateOfBirth: PersonWithLinksFieldsFragment["dateOfBirth"];
  dateOfDeath: PersonWithLinksFieldsFragment["dateOfDeath"];
  wiki?: PersonWithLinksFieldsFragment["wiki"];
  isFallback: boolean;
  close: () => void;
}

const getDodValue = (dod?: string | null) => {
  if (dod && dod === "1") {
    return "dead";
  }
  if (dod) {
    return dod;
  }
  return "alive";
};

const GraphDetailsCard: FC<CardProps> = ({
  title,
  uid,
  nickNames,
  story,
  dateOfBirth,
  dateOfDeath,
  wiki,
  isFallback,
  close,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card classes={{ root: classes.cardRoot }}>
        <CardHeader
          title={title}
          action={
            <IconButton onClick={close}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          {nickNames && nickNames.length > 0 && (
            <Typography variant="body1">
              Nicknames: <em>{nickNames?.join(", ")}</em>
            </Typography>
          )}
          <Typography variant="body1">
            Main book:{" "}
            {isFallback ? (
              "not available in Lite Mode"
            ) : (
              <em>{story?.title}</em>
            )}
          </Typography>
          <Typography variant="body1">
            {dateOfBirth && (
              <>
                🚼 <em>{dateOfBirth}</em>
              </>
            )}
          </Typography>
          <Typography variant="body1">
            ✝️ <em>{getDodValue(dateOfDeath)}</em>
          </Typography>
          {wiki && (
            <Typography variant="body2">
              This character is based on a real person.{" "}
              <a href={wiki}>Read more</a>.
            </Typography>
          )}
          <Typography variant="body2" align="center">
            <em>&lt;{uid}&gt;</em>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphDetailsCard;
