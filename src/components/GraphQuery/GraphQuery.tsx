import { Graph } from "react-d3-graph";
import { getSdk } from "../../generated/graphql";
import appGraphConfig, { CustomNode } from "./appGraphConfig";
import { GraphQLClient } from "graphql-request";
import { FC, useEffect, useRef, useState } from "react";
import {
  convertPersonsToGraphData,
  isJustVal,
} from "./convertPersonsToGraphData";
// import getConnectedToNameDQL from "../../dql/getPersonsByRelation";

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

// function isJustVal<T>(val: Maybe<T>): val is T {
//   return Boolean(val);
// }

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

const GraphQuery: FC = () => {
  const [graphData, setGraphData] = useState<any>();
  const { getPersonByName, getPersonByUid } = getSdk(client);
  const graphRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const { queryPerson } = await getPersonByName({ name: "Pa Salt" });

        const justPersons = queryPerson?.filter(isJustVal) ?? [];

        const [nodes, links] = convertPersonsToGraphData(justPersons);

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

  const onClickNode = (uid: string, { name }: CustomNode) => {
    console.log("onclicknode", uid, name);
    // getConnectedToNameDQL(name);

    (async () => {
      try {
        // TODO replace getPersonByName with getPersonByUID
        const { getPerson } = await getPersonByUid({ uid });
        // const { queryPerson } = await getAllPersons();
        // TODO fix bug: click Maia, it should also unwrap her parents (needs reverse key?)

        const persons = getPerson ? [getPerson].filter(isJustVal) : [];
        const [nodes, links] = persons
          ? convertPersonsToGraphData(persons)
          : [[], []];

        setGraphData({
          nodes: graphData.nodes.concat(nodes),
          links: graphData.links.concat(links),
        });

        // TODO fix resetNodesPosition, see https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/Sandbox.jsx
        const graphInst = graphRef.current;
        if (graphInst) {
          // console.log("graphref", graphRef.current);
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
