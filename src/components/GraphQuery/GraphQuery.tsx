import { Graph } from "react-d3-graph";
import {
  Maybe,
  // useGetAllPersonsQuery,
  // useGetPersonByNameQuery,
  getSdk,
} from "../../generated/graphql";
// import { ApolloClient, InMemoryCache } from "@apollo/client";
import appGraphConfig from "./appGraphConfig";
import { GraphQLClient } from "graphql-request";
import { FC, useEffect, useState } from "react";

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: "http://localhost:8080/graphql",
// });

const client = new GraphQLClient(process.env["REACT_APP_GRAPHQL_URL"] || "", {
  headers: {},
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

// TODO first search a person (Pa Salt) by name. Then onclick find all related nodes with
/*
{
  // node(func: uid(0x8)) { or
  node(func: eq(Person.name, "Pa Salt")) {
    uid
    expand(_all_) {
      uid
      expand(_all_)
    }
  }
}
*/
// however, this is "Ratel" DQL. This should be a normal query.

const GraphQuery: FC = () => {
  const [graphData, setGraphData] = useState<any>();
  const { getAllPersons } = getSdk(client);

  useEffect(() => {
    (async () => {
      try {
        const { queryPerson } = await getAllPersons();
        const justPersons = queryPerson?.filter(isJustVal) ?? [];

        const nodes = justPersons.map(({ personID, name }) => ({
          id: personID || "a",
          name: name || "",
        }));

        const links = justPersons.flatMap(
          ({
            personID,
            parent,
            nonBioParent,
            physicalRelation,
            // otherRelation,
          }) => {
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
              physicalRelation
                ?.filter(isJustVal)
                .map((physicalRelationPerson) => ({
                  source: personID,
                  target: physicalRelationPerson?.personID ?? "",
                })) ?? [];
            // const relatedOther
            //   otherRelation?.filter(isJustVal).map((otherRelationPerson) => ({
            //     source: personID,
            //     target: otherRelationPerson?.personID ?? "",
            //   })) ?? [];
            return relatedParent.concat(relatedNonBio, relatedPhys); // , relatedOther);
          }
        );

        const linksToExistingNodes = links.filter(
          (link) =>
            nodes.some((n) => n.id === link.source) &&
            nodes.some((n) => n.id === link.target)
        );

        // const graphData = {
        //   nodes,
        //   links: linksToExistingNodes,
        // };
        setGraphData({
          nodes,
          links: linksToExistingNodes,
        });
        console.log(nodes, links);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  // const { data /* loading,*/, error } = useGetAllPersonsQuery({
  //   client,
  // });
  // const { data /*, loading */, error } = useGetPersonByNameQuery({
  //   client,
  //   variables: { name: "Salt" },
  // });

  // if (error) {
  //   console.error(error);
  // }

  const onClickNode = (uid: string) => {
    console.log(uid);
  };

  return (
    <>
      {graphData && graphData.nodes.length > 0 && (
        <Graph
          id="graph-id" // id is mandatory
          data={graphData}
          config={appGraphConfig(
            window.innerWidth,
            window.innerHeight - 64 - 5
          )}
          onClickNode={onClickNode}
          //   onClickLink={onClickLink}
        />
      )}
    </>
  );
};

export default GraphQuery;
