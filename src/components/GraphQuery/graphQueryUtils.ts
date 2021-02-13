import { GraphLink } from "react-d3-graph";
import { SET_LITE_MODE } from "../../context/actions";
import { getSdk, PersonWithLinksFieldsFragment } from "../../generated/graphql";
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

export const getMaybePersons = async (searchByBook: string, dispatch: React.Dispatch<any>) => {
  const { getStartNodes, getStoryById, getAllPersons } = getSdk(client);
  try {
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
  } catch (err) {
    console.error("DGraph server not available, falling back to Lite Mode: " + err);
    const allJson = await (await fetch("/7sgraph/all.json")).json();
    dispatch({
      type: SET_LITE_MODE,
      payload: true,
    });
    return allJson.data.queryPerson as PersonWithLinksFieldsFragment[];
  }
};
