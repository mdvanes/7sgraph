import { Graph } from "react-d3-graph";
import { getSdk } from "../../generated/graphql";
import appGraphConfig, { CustomNode } from "./appGraphConfig";
import { GraphQLClient } from "graphql-request";
import { FC, useEffect, useRef, useState } from "react";
import {
  convertPersonsToGraphData,
  isJustVal,
} from "./convertPersonsToGraphData";
import GraphTools from "./GraphTools";
// import getConnectedToNameDQL from "../../dql/getPersonsByRelation";

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: "http://localhost:8080/graphql",
// });

const client = new GraphQLClient(process.env["REACT_APP_GRAPHQL_URL"] || "", {
  headers: {},
});

const GraphQuery: FC = () => {
  // TODO fix any type
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

  const onClickNode = (uid: string, originNode: CustomNode) => {
    // console.log("onclicknode", uid, originNode);
    // getConnectedToNameDQL(name);

    (async () => {
      try {
        const { getPerson } = await getPersonByUid({ uid });
        const persons = getPerson ? [getPerson].filter(isJustVal) : [];
        const [nodes, links] = persons
          ? convertPersonsToGraphData(persons, originNode)
          : [[], []];

        setGraphData({
          nodes: graphData.nodes.concat(nodes),
          links: graphData.links.concat(links),
        });

        // const graphInst = graphRef.current;
        // if (graphInst) {
        //   console.log("graphref", graphRef.current);
        //   // (graphInst as any).resetNodesPositions();
        // }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  useEffect(() => {
    console.log(graphData);
    // TODO deduplicate nodes and edges
  }, [graphData]);

  return (
    <>
      {/* <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
          Time range
        </Typography>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div> */}
      <GraphTools />
      {graphData && graphData.nodes.length > 0 && (
        <Graph
          id="graph-id" // id is mandatory
          ref={graphRef as any}
          data={{ ...graphData }} // , focusedNodeId: "pasalt" }}
          config={appGraphConfig(
            window.innerWidth,
            window.innerHeight - 64 - 5
          )}
          onClickNode={onClickNode as any}
          //   onClickLink={onClickLink}
          // onNodePositionChange={(n, x, y) => {
          //   console.log(`Node ${n} moved to ${x},${y}`);
          // }}
        />
      )}
    </>
  );
};

export default GraphQuery;
