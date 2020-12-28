import { GraphLink } from "react-d3-graph";
import {
  Maybe,
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
  if (type === "parent") {
    return "#141823";
  }
  if (type === "nonBioParent") {
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
    ({ personID, parent, nonBioParent, physicalRelation, otherRelation }) => {
      const allRelations = {
        parent,
        nonBioParent,
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

  const linksToExistingNodes = links.filter(
    (link) =>
      allNodes.some((n) => n.id === link.source) &&
      allNodes.some((n) => n.id === link.target)
  );

  return [allNodes, linksToExistingNodes];
};

const convertRelatedToNodes = ({
  parent,
  nonBioParent,
  physicalRelation,
  otherRelation,
}: PersonWithLinksFieldsFragment): CustomNode[] => {
  const justParents = parent?.filter(isJustVal) ?? [];
  const justNonBioParents = nonBioParent?.filter(isJustVal) ?? [];
  const justPhysical = physicalRelation?.filter(isJustVal) ?? [];
  const justOther = otherRelation?.filter(isJustVal) ?? [];
  const nodes = justParents
    .concat(justNonBioParents, justPhysical, justOther)
    .map<CustomNode>(convertPersonToNode);
  return nodes;
};
