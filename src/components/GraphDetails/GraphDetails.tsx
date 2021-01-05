import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useGraphSettingsContext } from "../../context/GraphSettingsContext";
import { GetPersonDetailsByUidQuery, getSdk } from "../../generated/graphql";
import client from "../GraphQuery/graphClient";
import useStyles from "./GraphDetails.styles";

interface Props {
  uid: string;
}

const getGenderIcon = (gender?: string | null) => {
  if (gender === "male") {
    return "♂️";
  } else if (gender === "female") {
    return "♀️";
  }
  return "";
};

const getDodValue = (dod?: number | null) => {
  if (dod && dod === 1) {
    return "dead";
  }
  if (dod) {
    return dod;
  }
  return "alive";
};

const GraphDetails: FC<Props> = ({ uid }) => {
  const classes = useStyles();
  const {
    state: { detailsFor },
  } = useGraphSettingsContext();

  const [person, setPerson] = useState<
    GetPersonDetailsByUidQuery["getPerson"] | null
  >(null);

  const memoizedInitialize = useCallback(async () => {
    try {
      const { getPersonDetailsByUid } = getSdk(client);
      const { getPerson } = await getPersonDetailsByUid({ uid });
      if (getPerson) {
        setPerson(getPerson);
      }
    } catch (err) {
      console.error(err);
    }
  }, [uid]);

  useEffect(() => {
    memoizedInitialize();
  }, [memoizedInitialize]);

  const title = person ? `${person.name} ${getGenderIcon(person.gender)}` : "";

  return person ? (
    <div className={classes.root}>
      <Card classes={{ root: classes.cardRoot }}>
        <CardHeader title={title} />
        <CardContent>
          {person.nickNames && person.nickNames.length > 0 && (
            <Typography variant="body1">
              Nicknames: <em>{person.nickNames?.join(", ")}</em>
            </Typography>
          )}
          <Typography variant="body1">
            Main book: <em>{person.story?.title}</em>
          </Typography>
          <Typography variant="body1">
            {person.dateOfBirth && (
              <>
                🚼 <em>{person.dateOfBirth}</em>
              </>
            )}
          </Typography>
          <Typography variant="body1">
            ✝️ <em>{getDodValue(person.dateOfDeath)}</em>
          </Typography>
          <Typography variant="body2" align="center">
            <em>&lt;{detailsFor}&gt;</em>
          </Typography>
        </CardContent>
      </Card>
    </div>
  ) : (
    <></>
  );
};

export default GraphDetails;
