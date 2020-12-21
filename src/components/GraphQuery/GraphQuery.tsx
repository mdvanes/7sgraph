import { Graph } from "react-d3-graph";
import { Maybe, useGetAllPersonsQuery, useGetPersonByNameQuery } from "../../generated/graphql";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import appGraphConfig from "./appGraphConfig";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:8080/graphql",
});

// type Maybe1<T> = Maybe<T> | undefined;

// function withDefault<T>(v: Maybe<T>, defaultVal: T): T {
//   return v ? v : defaultVal;
// }

function isJustVal<T>(val: Maybe<T>): val is T {
  return Boolean(val);
}

// const fakeData = {
//   nodes: [
//     { id: "Maia" },
//     { id: "Alcyone" },
//     { id: "Asterope" },
//     { id: "Pa Salt" },
//   ],
//   links: [
//     {
//       source: "Pa Salt",
//       target: "Maia",
//     },
//   ],
// };

const GraphQuery = () => {
  const { data /*, loading, error */ } = useGetAllPersonsQuery({
    client,
  });
  // const { data /*, loading, error */ } = useGetPersonByNameQuery({
  //   client, variables: { name: "Salt"}
  // });

  const justPersons = data?.queryPerson?.filter(isJustVal) ?? [];

  const graphData = {
    nodes: justPersons.map(({ personID, name }) => ({
      id: personID || "a",
      name: name || "",
    })),
    links: justPersons.flatMap(
      ({ personID, parent, nonBioParent, physicalRelation }) => {
        const relatedParent =
          parent?.filter(isJustVal).map((parentPerson) => ({
            source: personID,
            target: parentPerson?.personID ?? "",
          })) ?? [];
        const relatedNonBio =
          nonBioParent?.filter(isJustVal).map((nonBioParentPerson) => ({
            source: personID,
            target: nonBioParentPerson?.personID ?? "",
          })) ?? [];
        const relatedPhys =
          physicalRelation?.filter(isJustVal).map((physicalRelationPerson) => ({
            source: personID,
            target: physicalRelationPerson?.personID ?? "",
          })) ?? [];
        return relatedParent.concat(relatedNonBio, relatedPhys);
      }
    ),
  };

  return (
    <>
      {graphData.nodes.length > 0 && (
        <Graph
          id="graph-id" // id is mandatory
          data={graphData}
          config={appGraphConfig}
          //   onClickNode={onClickNode}
          //   onClickLink={onClickLink}
        />
      )}
    </>
  );
};

export default GraphQuery;
