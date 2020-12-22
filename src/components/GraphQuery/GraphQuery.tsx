import { Graph } from "react-d3-graph";
import {
  Maybe,
  // useGetAllPersonsQuery,
  // useGetPersonByNameQuery,
  getSdk,
  GetPersonByNameQuery,
} from "../../generated/graphql";
// import { ApolloClient, InMemoryCache } from "@apollo/client";
import appGraphConfig, { CustomNode } from "./appGraphConfig";
import { GraphQLClient } from "graphql-request";
import { FC, useEffect, useRef, useState } from "react";
import getConnectedToNameDQL from "../../dql/getPersonsByRelation";

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

const fooMap = (queryPerson: GetPersonByNameQuery["queryPerson"]) => {
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

  return [nodes, linksToExistingNodes];
};

const GraphQuery: FC = () => {
  const [graphData, setGraphData] = useState<any>();
  const { getAllPersons, getPersonByName } = getSdk(client);
  const graphRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const { queryPerson } = await getPersonByName({ name: "Pa Salt" });
        // const justPersons = queryPerson?.filter(isJustVal) ?? [];

        // const nodes = justPersons.map(({ personID, name }) => ({
        //   id: personID || "a",
        //   name: name || "",
        // }));

        // const links = justPersons.flatMap(
        //   ({
        //     personID,
        //     parent,
        //     nonBioParent,
        //     physicalRelation,
        //     // otherRelation,
        //   }) => {
        //     // TODO extend Link
        //     type CustomLink = {
        //       source: string;
        //       target: string;
        //       color?: string;
        //     };
        //     // TODO make helper function
        //     const relatedParent: CustomLink[] =
        //       parent?.filter(isJustVal).map((parentPerson) => ({
        //         source: personID,
        //         target: parentPerson?.personID ?? "",
        //         color: "#141823",
        //       })) ?? [];
        //     const relatedNonBio =
        //       nonBioParent?.filter(isJustVal).map((nonBioParentPerson) => ({
        //         source: personID,
        //         target: nonBioParentPerson?.personID ?? "",
        //         color: "#3f51b5",
        //       })) ?? [];
        //     const relatedPhys =
        //       physicalRelation
        //         ?.filter(isJustVal)
        //         .map((physicalRelationPerson) => ({
        //           source: personID,
        //           target: physicalRelationPerson?.personID ?? "",
        //           color: "#f50057",
        //         })) ?? [];
        //     // const relatedOther
        //     //   otherRelation?.filter(isJustVal).map((otherRelationPerson) => ({
        //     //     source: personID,
        //     //     target: otherRelationPerson?.personID ?? "",
        //     //   })) ?? [];
        //     return relatedParent.concat(relatedNonBio, relatedPhys); // , relatedOther);
        //   }
        // );

        // const linksToExistingNodes = links.filter(
        //   (link) =>
        //     nodes.some((n) => n.id === link.source) &&
        //     nodes.some((n) => n.id === link.target)
        // );

        // const graphData = {
        //   nodes,
        //   links: linksToExistingNodes,
        // };

        const [nodes, links] = fooMap(queryPerson);

        setGraphData({
          nodes,
          links,
        });
        // console.log(nodes, links);
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

  const onClickNode = (uid: string, { name }: CustomNode) => {
    console.log(uid, name);
    // getConnectedToNameDQL(name);

    (async () => {
      try {
        // TODO replace getPersonByName with getPersonByUID
        // const { queryPerson } = await getPersonByName({ name });
        const { queryPerson } = await getAllPersons();
        // TODO unwrap nodes from nonBioParent, parent, etc
        // TODO fix bug: click Maia, it should also unwrap her parents (needs reverse key?)

        const [nodes, links] = fooMap(queryPerson);

        setGraphData({
          nodes,
          links,
        });

        // TODO fix resetNodesPosition, see https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/Sandbox.jsx
        const graphInst = graphRef.current;
        if(graphInst) {
          console.log("graphref", graphRef.current);
          (graphInst as any).resetNodesPositions();
        }
        // console.log(nodes, links);
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <>
      {graphData && graphData.nodes.length > 0 && (
        <Graph
          id="graph-id" // id is mandatory
          ref={graphRef as any}
          data={graphData}
          config={appGraphConfig(
            window.innerWidth,
            window.innerHeight - 64 - 5
          )}
          onClickNode={onClickNode as any}
          //   onClickLink={onClickLink}
        />
      )}
    </>
  );
};

export default GraphQuery;
