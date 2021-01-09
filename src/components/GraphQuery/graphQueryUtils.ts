import { GraphLink } from "react-d3-graph";
import { getSdk } from "../../generated/graphql";
import client from "./graphClient";

export const filterUniqueLinks = (links: GraphLink[]): GraphLink[] => {
  const compoundIdsToLinks: [string, GraphLink][] = links.map((l) => [
    `${l.source},${l.target}`,
    l,
  ]);
  const uniqueByCompoundId = Object.values(
    Object.fromEntries(compoundIdsToLinks)
  );
  return uniqueByCompoundId;
};

export const getMaybePersons = async (searchByBook: string) => {
  const { getStartNodes, getStoryById, getAllPersons } = getSdk(client);
  if (searchByBook && searchByBook === "all") {
    const { queryPerson } = await getAllPersons();
    return queryPerson;
  } else if (searchByBook) {
    const { getStory } = await getStoryById({ id: searchByBook });
    return getStory?.persons;
  } else {
    const { queryPerson } = await getStartNodes();
    return queryPerson;
  }
};
