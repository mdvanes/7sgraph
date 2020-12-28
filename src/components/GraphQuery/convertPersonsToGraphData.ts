import { Maybe } from "graphql/jsutils/Maybe";
import { GraphLink } from "react-d3-graph";
import {
  // Maybe,
  PersonFieldsFragment,
  PersonWithLinksFieldsFragment,
} from "../../generated/graphql";
import { CustomNode } from "./appGraphConfig";

const genderColor = (gender?: Maybe<string>): string | undefined => {
  if (gender === "male") {
    return "#357ae8";
  }
  if (gender === "female") {
    return "#f50057";
  }
  return;
};

const convertPersonToNode = ({
  personID,
  name,
  gender,
}: PersonWithLinksFieldsFragment): CustomNode => ({
  id: personID || "INVALID_PERSON_ID",
  name: name || "INVALID_PERSON_NAME",
  color: genderColor(gender),
});

export function isJustVal<T>(val: Maybe<T>): val is T {
  return Boolean(val);
}

const relationTypeColor = (type: string): string | undefined => {
  if (type === "children" || type === "parents") {
    return "#141823";
  }
  if (type === "nonBioChildren" || type === "nonBioParents") {
    return "#3f51b5";
  }
  if (type === "physicalRelation") {
    return "#f50057";
  }
};

const convertRelatedPersonToEdge = (type: string, personID: string) => (
  person: PersonFieldsFragment | null
): GraphLink => {
  return {
    source: personID,
    target: person?.personID ?? "INVALID_PERSON_ID",
    color: relationTypeColor(type),
  };
};

export const convertPersonsToGraphData = (
  persons: PersonWithLinksFieldsFragment[]
) => {
  const justPersons = persons?.filter(isJustVal) ?? [];

  const nodes = justPersons.map<CustomNode>(convertPersonToNode);

  // TODO should this not for tail too?
  const relatedNodes = convertRelatedToNodes(justPersons[0]);
  const allNodes = nodes.concat(relatedNodes);

  const links = justPersons.flatMap(
    ({
      personID,
      children,
      parents,
      nonBioChildren,
      nonBioParents,
      physicalRelation,
      otherRelation,
    }) => {
      const allRelations = {
        children,
        parents,
        nonBioChildren,
        nonBioParents,
        physicalRelation,
        otherRelation,
      };
      const edgesForAllRelations: GraphLink[] = Object.entries(
        allRelations
      ).flatMap(([relationType, relatedPersons]) => {
        return relatedPersons
          ? relatedPersons.map(
              convertRelatedPersonToEdge(relationType, personID)
            )
          : [];
      });
      return edgesForAllRelations;
    }
  );

  // TODO when "Zed" is added (e.g. by clicking "Maia"), the edge to "Electra" should be added directly.
  const linksToExistingNodes = links.filter(
    (link) =>
      allNodes.some((n) => n.id === link.source) &&
      allNodes.some((n) => n.id === link.target)
  );

  return [allNodes, linksToExistingNodes];
};

const convertRelatedToNodes = ({
  children,
  parents,
  nonBioChildren,
  nonBioParents,
  physicalRelation,
  otherRelation,
}: PersonWithLinksFieldsFragment): CustomNode[] => {
  const allRelations = {
    children,
    parents,
    nonBioChildren,
    nonBioParents,
    physicalRelation,
    otherRelation,
  };
  const allRelatedPersons = Object.entries(allRelations)
    .flatMap(([relationType, relatedPersons]) => relatedPersons)
    .filter(isJustVal);
  return allRelatedPersons.map<CustomNode>(convertPersonToNode)
};
