import React, { FC, useCallback, useEffect, useState } from "react";
import { useGraphSettingsContext } from "../../context/GraphSettingsContext";
import { GetPersonDetailsByUidQuery, getSdk } from "../../generated/graphql";
import client from "../GraphQuery/graphClient";
import GraphDetailsCard from "./GraphDetailsCard";

const getGenderIcon = (gender?: string | null) => {
  if (gender === "male") {
    return "♂️";
  } else if (gender === "female") {
    return "♀️";
  }
  return "";
};

const GraphDetails: FC = () => {
  const {
    state: { detailsFor },
  } = useGraphSettingsContext();
  const [uid, fallback] = detailsFor;

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

  const closeCard = () => {
    setPerson(null);
  };

  if (person) {
    const title = person
      ? `${person.name} ${getGenderIcon(person.gender)}`
      : "";

    return (
      <GraphDetailsCard
        title={title}
        uid={uid}
        nickNames={person.nickNames}
        story={person.story}
        dateOfBirth={person.dateOfBirth}
        dateOfDeath={person.dateOfDeath}
        isFallback={false}
        close={closeCard}
      />
    );
  }

  if (!person && fallback) {
    return (
      <GraphDetailsCard
        title={fallback.name}
        uid={uid}
        dateOfBirth={fallback?.dateOfBirth}
        dateOfDeath={fallback?.dateOfDeath}
        isFallback
        close={closeCard}
      />
    );
  }

  return <></>;
};

export default GraphDetails;
