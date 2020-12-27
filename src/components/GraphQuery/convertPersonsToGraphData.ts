import {
  Maybe,
  PersonWithLinksFieldsFragment,
} from "../../generated/graphql";
import { CustomNode } from "./appGraphConfig";

const convertPersonToNode = ({
  personID,
  name,
  gender,
}: PersonWithLinksFieldsFragment): CustomNode => ({
  id: personID || "a",
  name: name || "",
  color: genderColor(gender),
});

export function isJustVal<T>(val: Maybe<T>): val is T {
  return Boolean(val);
}

export const convertPersonsToGraphData = (
    //   queryPerson: GetPersonByNameQuery["queryPerson"]
  persons: PersonWithLinksFieldsFragment[]
) => {
  const justPersons = persons?.filter(isJustVal) ?? [];

  const nodes = justPersons.map<CustomNode>(convertPersonToNode);

  // TODO should this not for tail too?
  const relatedNodes = convertRelatedToNodes(justPersons[0]);
  const allNodes = nodes.concat(relatedNodes);

  const links = justPersons.flatMap(
    ({ personID, parent, nonBioParent, physicalRelation, otherRelation }) => {
      // TODO extend Link
      type CustomLink = {
        source: string;
        target: string;
        color?: string;
      };
      // TODO make helper function
      const relatedParent: CustomLink[] =
        parent?.filter(isJustVal).map((parentPerson) => ({
          source: personID,
          target: parentPerson?.personID ?? "",
          color: "#141823",
        })) ?? [];
      const relatedNonBio =
        nonBioParent?.filter(isJustVal).map((nonBioParentPerson) => ({
          source: personID,
          target: nonBioParentPerson?.personID ?? "",
          color: "#3f51b5",
        })) ?? [];
      const relatedPhys =
        physicalRelation?.filter(isJustVal).map((physicalRelationPerson) => ({
          source: personID,
          target: physicalRelationPerson?.personID ?? "",
          color: "#f50057",
        })) ?? [];
      const relatedOther =
        otherRelation?.filter(isJustVal).map((otherRelationPerson) => ({
          source: personID,
          target: otherRelationPerson?.personID ?? "",
        })) ?? [];
      return relatedParent.concat(relatedNonBio, relatedPhys, relatedOther);
    }
  );

  const linksToExistingNodes = links.filter(
    (link) =>
      allNodes.some((n) => n.id === link.source) &&
      allNodes.some((n) => n.id === link.target)
  );

  return [allNodes, linksToExistingNodes];
};

const genderColor = (gender?: Maybe<string>): string | undefined => {
  if (gender === "male") {
    return "#357ae8";
  }
  if (gender === "female") {
    return "#f50057";
  }
  return;
};

const convertRelatedToNodes = (
//   queryPerson: GetPersonByNameQuery["queryPerson"]
  {
    parent,
    nonBioParent,
    physicalRelation,
    otherRelation,
  }: PersonWithLinksFieldsFragment
): CustomNode[] => {
//   const justPersons = queryPerson?.filter(isJustVal) ?? [];
//   const {
//     parent,
//     nonBioParent,
//     physicalRelation,
//     otherRelation,
//   } = justPersons[0];

  const justParents = parent?.filter(isJustVal) ?? [];
  const justNonBioParents = nonBioParent?.filter(isJustVal) ?? [];
  const justPhysical = physicalRelation?.filter(isJustVal) ?? [];
  const justOther = otherRelation?.filter(isJustVal) ?? [];
  const nodes = justParents
    .concat(justNonBioParents, justPhysical, justOther)
    // TODO
    .map<CustomNode>(convertPersonToNode);
//   console.log(nodes);
  return nodes;
};

export const convertPersonsToGraphData1 = (
  // getPerson: GetPersonByUidQuery["getPerson"]
  person: PersonWithLinksFieldsFragment
) => {
  // const justPersons = queryPerson?.filter(isJustVal) ?? [];
  // const justPersons = [
  //   getPerson || {
  //     personID: "",
  //     name: "",
  //     parent: [],
  //     nonBioParent: [],
  //     physicalRelation: [],
  //     otherRelation: [],
  //   },
  // ];
  const justPersons = [person];

  const nodes = justPersons.map(({ personID, name }) => ({
    id: personID || "a",
    name: name || "",
  }));
  //  || { parent: [], nonBioParent: [] }

  const links = justPersons.flatMap(
    ({ personID, parent, nonBioParent, physicalRelation, otherRelation }) => {
      // TODO extend Link
      type CustomLink = {
        source: string;
        target: string;
        color?: string;
      };
      // TODO make helper function
      const relatedParent: CustomLink[] =
        parent?.filter(isJustVal).map((parentPerson) => ({
          source: personID,
          target: parentPerson?.personID ?? "",
          color: "#141823",
        })) ?? [];
      const relatedNonBio =
        nonBioParent?.filter(isJustVal).map((nonBioParentPerson) => ({
          source: personID,
          target: nonBioParentPerson?.personID ?? "",
          color: "#3f51b5",
        })) ?? [];
      const relatedPhys =
        physicalRelation?.filter(isJustVal).map((physicalRelationPerson) => ({
          source: personID,
          target: physicalRelationPerson?.personID ?? "",
          color: "#f50057",
        })) ?? [];
      const relatedOther =
        otherRelation?.filter(isJustVal).map((otherRelationPerson) => ({
          source: personID,
          target: otherRelationPerson?.personID ?? "",
        })) ?? [];
      return relatedParent.concat(relatedNonBio, relatedPhys, relatedOther);
    }
  );

  // if(getPerson) {
  //   const relatedNodes = convertRelatedToNodes1(getPerson);
  //   const allNodes = nodes.concat(relatedNodes);
  // }
  const allNodes = person
    ? nodes.concat(convertRelatedToNodes1(person))
    : nodes;

  const linksToExistingNodes = links.filter(
    (link) =>
      allNodes.some((n) => n.id === link.source) &&
      allNodes.some((n) => n.id === link.target)
  );

  return [allNodes, linksToExistingNodes];
};

// TODO merge with convertRelatedToNodes. Difference is this accepts 1 person, above accepts an array
const convertRelatedToNodes1 = (
  // getPerson: GetPersonByUidQuery["getPerson"]
  {
    parent,
    nonBioParent,
    physicalRelation,
    otherRelation,
  }: PersonWithLinksFieldsFragment
): CustomNode[] => {
  // const justPersons = queryPerson?.filter(isJustVal) ?? [];
  // const {
  //   parent,
  //   nonBioParent,
  //   physicalRelation,
  //   otherRelation,
  // } = getPerson || { parent: [], nonBioParent: [] };

  const justParents = parent?.filter(isJustVal).filter(isJustVal) ?? [];
  const justNonBioParents =
    nonBioParent?.filter(isJustVal).filter(isJustVal) ?? [];
  const justPhysical =
    physicalRelation?.filter(isJustVal).filter(isJustVal) ?? [];
  const justOther = otherRelation?.filter(isJustVal).filter(isJustVal) ?? [];
  const nodes = justParents
    .concat(justNonBioParents, justPhysical, justOther)
    .map<CustomNode>(({ personID, name }) => ({
      id: personID || "a",
      name: name || "",
    }));
  console.log(nodes);
  return nodes;
};
